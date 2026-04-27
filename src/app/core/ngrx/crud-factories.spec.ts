import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Actions } from '@ngrx/effects';

import { createCrudActions } from './action-factory';
import { createEntityReducer, CrudState } from './reducer-factory';
import { createEntitySelectors } from './selectors-factory';
import { EffectFactory } from './effect-factory';
import { Student } from '../model/student.model';
import { IPersistencePort } from '../ports/persistence-port';
import * as NotificationActions from '../state/notification/notification.actions';

describe('NgRx CRUD Factories', () => {
  const entityName = 'Student';
  const actions = createCrudActions<Student>(entityName);
  
  const mockStudent: Student = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date('2000-01-01'),
    dni: 12345678,
  };

  describe('Action Factory', () => {
    it('should create actions with the correct prefix', () => {
      expect(actions.loadAll.type).toBe(`[${entityName}] Load All`);
      expect(actions.loadAllSuccess.type).toBe(`[${entityName}] Load All Success`);
      expect(actions.create.type).toBe(`[${entityName}] Create`);
      expect(actions.createSuccess.type).toBe(`[${entityName}] Create Success`);
      expect(actions.update.type).toBe(`[${entityName}] Update`);
      expect(actions.delete.type).toBe(`[${entityName}] Delete`);
    });
  });

  describe('Reducer Factory', () => {
    const { reducer, adapter, initialState } = createEntityReducer<Student>(actions);

    it('should return the initial state on unknown action', () => {
      const action = { type: 'Unknown' };
      const state = reducer(initialState, action);
      expect(state).toBe(initialState);
    });

    it('should set loading to true on loadAll', () => {
      const action = actions.loadAll({ pageIndex: 0, pageSize: 10 });
      const state = reducer(initialState, action);
      expect(state.loading).toBeTrue();
      expect(state.pageIndex).toBe(0);
      expect(state.pageSize).toBe(10);
    });

    it('should add items on loadAllSuccess', () => {
      const action = actions.loadAllSuccess({ items: [mockStudent], total: 1 });
      const state = reducer(initialState, action);
      expect(state.loading).toBeFalse();
      expect(state.total).toBe(1);
      expect(state.ids.length).toBe(1);
      expect(state.entities[mockStudent.id]).toEqual(mockStudent);
    });

    it('should add one item on createSuccess', () => {
      const action = actions.createSuccess({ item: mockStudent });
      const state = reducer(initialState, action);
      expect(state.loading).toBeFalse();
      expect(state.ids.length).toBe(1);
      expect(state.entities[mockStudent.id]).toEqual(mockStudent);
    });
    
    it('should remove one item on deleteSuccess', () => {
      const stateWithItem = adapter.addOne(mockStudent, initialState);
      const action = actions.deleteSuccess({ id: mockStudent.id });
      const state = reducer(stateWithItem, action);
      expect(state.loading).toBeFalse();
      expect(state.ids.length).toBe(0);
      expect(state.entities[mockStudent.id]).toBeUndefined();
    });
  });

  describe('Selectors Factory', () => {
    const featureKey = 'studentFeature';
    const { adapter, initialState } = createEntityReducer<Student>(actions);
    const selectors = createEntitySelectors<Student>(featureKey, adapter);

    const populatedState: CrudState<Student> = adapter.setAll([mockStudent], {
      ...initialState,
      loading: false,
      total: 1
    });

    const mockAppState = {
      [featureKey]: populatedState
    };

    it('should select all items', () => {
      const selected = selectors.selectAll(mockAppState);
      expect(selected.length).toBe(1);
      expect(selected[0]).toEqual(mockStudent);
    });

    it('should select loading state', () => {
      const loading = selectors.selectLoading(mockAppState);
      expect(loading).toBeFalse();
    });

    it('should select total count', () => {
      const total = selectors.selectTotalRest(mockAppState);
      expect(total).toBe(1);
    });
  });

  describe('Effect Factory', () => {
    let actions$: Observable<Action>;
    let effects: EffectFactory<Student>;
    let persistencePortSpy: jasmine.SpyObj<IPersistencePort<Student>>;
    let translateServiceSpy: jasmine.SpyObj<TranslateService>;

    beforeEach(() => {
      persistencePortSpy = jasmine.createSpyObj('IPersistencePort', ['list', 'getById', 'create', 'update', 'delete']);
      translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);
      translateServiceSpy.instant.and.returnValue('Translated Message');

      TestBed.configureTestingModule({
        providers: [
          provideMockActions(() => actions$)
        ]
      });

      class StudentEffectFactory extends EffectFactory<Student> {
        constructor(a$: Actions, port: IPersistencePort<Student>, translate: TranslateService) {
          super(a$, actions, port, translate);
        }
      }

      effects = new StudentEffectFactory(TestBed.inject(Actions), persistencePortSpy, translateServiceSpy);
    });

    it('should handle loadAll$ success', (done) => {
      const response = { content: [mockStudent], totalElements: 1 };
      persistencePortSpy.list.and.returnValue(of(response) as any);

      actions$ = of(actions.loadAll({ pageIndex: 0, pageSize: 10 }));

      effects.loadAll$.subscribe(result => {
        expect(result).toEqual(actions.loadAllSuccess({ items: [mockStudent], total: 1 }));
        expect(persistencePortSpy.list).toHaveBeenCalledWith(0, 10, undefined as any, undefined as any, 'AND');
        done();
      });
    });

    it('should handle loadAll$ failure', (done) => {
      const error = new Error('Failed to load');
      persistencePortSpy.list.and.returnValue(throwError(() => ({ error })));

      actions$ = of(actions.loadAll({ pageIndex: 0, pageSize: 10 }));

      effects.loadAll$.subscribe(result => {
        expect(result).toEqual(actions.loadAllFailure({ error }));
        done();
      });
    });

    it('should handle create$ success', (done) => {
      persistencePortSpy.create.and.returnValue(of(mockStudent));

      actions$ = of(actions.create({ item: mockStudent }));

      const expectedResults = [
        actions.createSuccess({ item: mockStudent }),
        NotificationActions.showNotification({ message: 'Translated Message', kind: 'success' })
      ];
      
      let emissions = 0;
      effects.create$.subscribe(result => {
        expect(result).toEqual(expectedResults[emissions]);
        emissions++;
        if (emissions === 2) {
          expect(persistencePortSpy.create).toHaveBeenCalledWith(mockStudent);
          done();
        }
      });
    });

    it('should handle delete$ success', (done) => {
      persistencePortSpy.delete.and.returnValue(of({} as any));

      actions$ = of(actions.delete({ id: mockStudent.id }));

      effects.delete$.subscribe(result => {
        expect(result).toEqual(actions.deleteSuccess({ id: mockStudent.id }));
        expect(persistencePortSpy.delete).toHaveBeenCalledWith(mockStudent.id);
        done();
      });
    });
  });
});
