import { createCrudActions } from '../../ngrx/action-factory';
import { StudentRegistration } from '../../model/student-registration.model';

export const studentRegistrationActions = createCrudActions<StudentRegistration>('StudentRegistration');
