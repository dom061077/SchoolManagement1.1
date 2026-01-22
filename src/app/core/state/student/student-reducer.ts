import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { studentActions } from '../../state/student/student-actions';
import { Student } from '../../model/student.model';
import { createEntitySelectors } from '../../ngrx/selectors-factory';

const { reducer, adapter, initialState } = createEntityReducer<Student>(studentActions);

/*
  In the below snippet code I define the studentfeature will be used in student module to register the store feature
*/
export const studentFeature = createFeature({
  name: 'students',
  reducer,
});

export const studentSelectors = createEntitySelectors<Student>(studentFeature.name, adapter);