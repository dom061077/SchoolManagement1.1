import { createCrudActions } from '../../ngrx/action-factory';
import { SchoolExam } from '../../model/school-exam.model';

export const schoolExamActions = createCrudActions<SchoolExam>('SchoolExam');
