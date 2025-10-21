import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseFacade } from '../../ngrx/facade-base';
import { studentActions } from './student-actions';
import { Student } from '../../model/student.model';

@Injectable({ providedIn: 'root' })
export class StudentFacade extends BaseFacade<Student> {
  constructor(store: Store) {
    super(store, studentActions);
  }
}
