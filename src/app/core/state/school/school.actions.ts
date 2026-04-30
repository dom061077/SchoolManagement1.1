import { createCrudActions } from '../../ngrx/action-factory';
import { School } from '../../model/school.model';

export const schoolActions = createCrudActions<School>('School');
