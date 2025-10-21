import { createCrudActions } from '../../ngrx/action-factory';
import { Student } from '../../model/student.model'

export const studentActions = createCrudActions<Student>('Student');
