import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { schoolExamActions } from './school-exam-actions';
import { SchoolExam } from '../../model/school-exam.model';
import { createEntitySelectors } from '../../ngrx/selectors-factory';

const { reducer, adapter, initialState } = createEntityReducer<SchoolExam>(schoolExamActions);

export const schoolExamFeature = createFeature({
  name: 'schoolExams',
  reducer,
});

export const schoolExamSelectors = createEntitySelectors<SchoolExam>(schoolExamFeature.name, adapter);
