import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase } from '../../ngrx/facade-base';
import { Student } from '../../model/student.model';
import { StudentActions } from '../../state/student/student-actions';
import { studentSelectors } from '../../state/student/student-reducer';
import { EntityState } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class StudentFacade extends FacadeBase<Student> {
  constructor(store: Store<{ feature: EntityState<Student> }>) {
    super(store, StudentActions, studentSelectors);
  }

  searchStudents(dni: number, lastName: string, firstName: string, pageIndex: number, pageSize: number) {
    this.store.dispatch(StudentActions.searchStudents({ dni, lastName, firstName, pageIndex, pageSize }));
  }
}