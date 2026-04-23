import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentaddeditComponent } from './studentaddedit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StudentFacade } from '../../../core/state/student/student.facade';
import { ProvinceFacade } from '@app/core/state/location/province/province.facade';
import { LocaltyFacade } from '@app/core/state/location/locality/locality.facade';
import { EstudioEnumFacade } from '../../../core/state/estudioenum/estudioenum.facade';
import { UiService } from '../../shared/ui.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';

describe('StudentaddeditComponent', () => {
  let component: StudentaddeditComponent;
  let fixture: ComponentFixture<StudentaddeditComponent>;

  // Mocks
  const mockStudentFacade = {
    create: jasmine.createSpy('create'),
    update: jasmine.createSpy('update'),
    loadAll: jasmine.createSpy('loadAll')
  };

  const mockProvinceFacade = {
    loadAll: jasmine.createSpy('loadAll')
  };

  const mockLocaltyFacade = {
    loadAll: jasmine.createSpy('loadAll'),
    selectProvince: jasmine.createSpy('selectProvince'),
    selectDepartment: jasmine.createSpy('selectDepartment')
  };

  const mockEstudioEnumFacade = {
    loadAll: jasmine.createSpy('loadAll')
  };

  const mockTranslateService = {
    instant: jasmine.createSpy('instant').and.returnValue('Translated Title'),
    get: jasmine.createSpy('get').and.returnValue(of('Translated Title')),
    // The pipe subscribes to these three events on init
    onTranslationChange: new EventEmitter(),
    onLangChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  };

  const mockMatDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockMatDialog = {
    open: jasmine.createSpy('open')
  };

  const mockStore = {
    selectSignal: jasmine.createSpy('selectSignal').and.returnValue(() => []),
    dispatch: jasmine.createSpy('dispatch')
  };

  const mockUiService = {
    getDateFormat: jasmine.createSpy('getDateFormat').and.returnValue('dd/MM/yyyy')
  };

  beforeEach(async () => {
    // Modify mockStore behavior for specific selectors if necessary
    mockStore.selectSignal.and.callFake((selector: any) => {
      return () => []; // default signal returning an empty array
    });

    await TestBed.configureTestingModule({
      declarations: [StudentaddeditComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), NgSelectModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: StudentFacade, useValue: mockStudentFacade },
        { provide: ProvinceFacade, useValue: mockProvinceFacade },
        { provide: LocaltyFacade, useValue: mockLocaltyFacade },
        { provide: EstudioEnumFacade, useValue: mockEstudioEnumFacade },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { code: 0, title: 'STUDENT.ADD_STUDENT', readOnly: false, toDelete: false } },
        { provide: Store, useValue: mockStore },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: UiService, useValue: mockUiService }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate forms when editcode > 0', () => {
    // Setup for edit scenario
    component.editcode = 1;
    const mockStudent = { id: 1, lastName: 'Perez', firstName: 'Juan' };
    spyOn(component, 'populateForms');

    // Simulate selectEntities returning a mock student dictionary
    component.selectEntities = (() => ({ 1: mockStudent })) as any;

    component.ngOnInit();

    expect(component.populateForms).toHaveBeenCalledWith(mockStudent as any);
  });

  it('should transform raw data to student properly', () => {
    const rawData = {
      id: '1',
      lastName: 'Doe',
      firstName: 'John',
      birthDate: '2000-01-01',
      dni: '12345678',
      localidadId: '10',
      departamentoId: '20',
      provinciaId: '30'
    };

    const student = component.transformRawDataToStudent(rawData);
    expect(student.id).toBe(1);
    expect(student.lastName).toBe('Doe');
    expect(student.firstName).toBe('John');
    expect(student.dni).toBe(12345678);
    expect(student.localidadId).toBe(10);
    expect(student.departamentoId).toBe(20);
    expect(student.provinciaId).toBe(30);
  });

  it('should call facade create on submit if editcode is 0 and forms are valid', () => {
    component.editcode = 0;

    // Setup valid form
    component.personalDataForm.patchValue({
      lastName: 'Smith',
      firstName: 'Jane',
      birthDate: '2000-01-01',
      dni: '12345678'
    });

    component.onSubmit();

    expect(mockStudentFacade.create).toHaveBeenCalled();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });
});
