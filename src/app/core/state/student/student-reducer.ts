import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { studentActions } from '../../state/student/student-actions';
import { Student } from '../../model/student.model';

const { reducer, adapter, initialState } = createEntityReducer<Student>(studentActions);

export const studentFeature = createFeature({
  name: 'students',
  reducer,
});

const selectFeatureState = (state: any) => state[studentFeature.name];

const {
  selectAll: selectAllStudents,
  selectEntities: selectStudentEntities,
  selectIds: selectStudentIds,
  selectTotal: selectStudentTotal,
} = adapter.getSelectors(selectFeatureState);

const selectLoading = (state: any) => selectFeatureState(state)?.loading ?? false;
const selectError = (state: any) => selectFeatureState(state)?.error ?? null;

export const studentSelectors = {
  selectAll: selectAllStudents,
  selectEntities: selectStudentEntities,
  selectIds: selectStudentIds,
  selectTotal: selectStudentTotal,
  selectLoading,
  selectError,
};

export { adapter };
