import { createEntityReducer } from '../../ngrx/reducer-factory';
import { StudentAction } from '../student/student.actions';
import { Student } from '../../model/student.model';

const { reducer, adapter } = createEntityReducer<Student>(StudentAction);

export const studentReducer = reducer;
export const studentAdapter = adapter;
export const STUDENT_FEATURE_KEY = 'students';
