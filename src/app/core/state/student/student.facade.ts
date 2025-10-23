import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase } from '../../ngrx/facade-base';
import { Student } from '../../model/student.model';
import { studentActions } from '../../state/student/student-actions';
import { studentSelectors } from '../../state/student/student-reducer';
import { EntityState } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class StudentFacade extends FacadeBase<Student> {
  constructor(store: Store<{ feature: EntityState<Student> }>) {
    super(store, studentActions, studentSelectors);
  }
}