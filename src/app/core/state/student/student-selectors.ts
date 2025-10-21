import { createEntitySelectors } from '../../ngrx/selectors-factory';
import { studentAdapter, STUDENT_FEATURE_KEY } from '../../state/student/student-reducer';

export const StudentSelectors = createEntitySelectors(STUDENT_FEATURE_KEY, studentAdapter);
