import { createEntityReducer } from '../../ngrx/reducer-factory';
import { studentActions } from './student-actions';

export const studentReducer = createEntityReducer(studentActions);
