import { createCrudActions } from '../../ngrx/action-factory';
import { Shift } from '../../model/shift.model';

export const shiftActions = createCrudActions<Shift>('Shift');
