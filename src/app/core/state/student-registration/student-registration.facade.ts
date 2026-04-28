import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase } from '../../ngrx/facade-base';
import { StudentRegistration } from '../../model/student-registration.model';
import { studentRegistrationActions } from './student-registration-actions';
import { studentRegistrationSelectors } from './student-registration-reducer';
import { EntityState } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class StudentRegistrationFacade extends FacadeBase<StudentRegistration> {
  constructor(store: Store<{ feature: EntityState<StudentRegistration> }>) {
    super(store, studentRegistrationActions, studentRegistrationSelectors);
  }
}
