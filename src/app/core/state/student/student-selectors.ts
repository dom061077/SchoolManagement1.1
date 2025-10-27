import { createEntitySelectors } from '../../ngrx/selectors-factory';
import { adapter, studentFeature } from '../../state/student/student-reducer';

export const studentSelectors = createEntitySelectors(studentFeature.name, adapter);
