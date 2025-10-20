import { createCrudActions } from '../../ngrx/action-factory';
import { Student } from '../../model/student.model'

export const StudentAction = createCrudActions<Student>('Student');
