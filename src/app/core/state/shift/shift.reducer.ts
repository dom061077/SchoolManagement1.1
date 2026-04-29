import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { shiftActions } from './shift.actions';
import { Shift } from '../../model/shift.model';
import { createEntitySelectors } from '../../ngrx/selectors-factory';

const { reducer, adapter, initialState } = createEntityReducer<Shift>(shiftActions);

export const shiftFeature = createFeature({
  name: 'shifts',
  reducer,
});

export const shiftSelectors = createEntitySelectors<Shift>(shiftFeature.name, adapter);
