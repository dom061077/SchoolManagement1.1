import { createEntityReducer } from '../../ngrx/reducer-factory';
import { StudentActions } from './student-actions';
import { Student } from '../../model/student.model';

const { reducer, adapter } = createEntityReducer<Student>(StudentActions);

export const studentReducer = reducer;
export const studentAdapter = adapter;
export const STUDENT_FEATURE_KEY = 'students';
