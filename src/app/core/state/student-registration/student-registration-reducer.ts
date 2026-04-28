import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { studentRegistrationActions } from './student-registration-actions';
import { StudentRegistration } from '../../model/student-registration.model';
import { createEntitySelectors } from '../../ngrx/selectors-factory';

const { reducer, adapter, initialState } = createEntityReducer<StudentRegistration>(studentRegistrationActions);

export const studentRegistrationFeature = createFeature({
  name: 'studentRegistrations',
  reducer,
});

export const studentRegistrationSelectors = createEntitySelectors<StudentRegistration>(studentRegistrationFeature.name, adapter);
