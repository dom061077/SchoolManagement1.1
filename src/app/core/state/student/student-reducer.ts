import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { studentActions } from '../../state/student/student-actions';
import { Student } from '../../model/student.model';

const { reducer, adapter, initialState } = createEntityReducer<Student>(studentActions);

/*
  In the below snippet code I define the studentfeature will be used in student module to register the store feature
*/
export const studentFeature = createFeature({
  name: 'students',
  reducer,
});

/**
 * 
 * @param state 
 * @returns 
 * This is the base selector. It takes the entire application state (state) and returns the specific part managed by this file, using the name defined in studentFeature.
    I could have use (state: AppState) method
    It's used to pass as parameter. In this case to getSelectors method.
  */
const selectFeatureState = (state: any) => state[studentFeature.name];

/*
Destructuring and Renaming: The generated selectors are renamed (selectAll becomes selectAllStudents, etc.) for clearer use in the application.
*/
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


