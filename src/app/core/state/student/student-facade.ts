import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseFacade } from '../../ngrx/facade-base';
import { studentActions } from './student-actions';
import { Student } from '../../model/student.model';
import { CrudState } from '../../ngrx/reducer-factory';

@Injectable({ providedIn: 'root' })
export class StudentFacade extends BaseFacade<Student> {
  constructor(store: Store<{ state: CrudState<Student> }>) {
    // cast to any to satisfy BaseFacade's stricter Store type
    super(store , studentActions);
  }
}
