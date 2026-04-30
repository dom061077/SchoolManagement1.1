import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '../../ngrx/reducer-factory';
import { schoolActions } from './school.actions';
import { School } from '../../model/school.model';
import { createEntitySelectors } from '../../ngrx/selectors-factory';

const { reducer, adapter, initialState } = createEntityReducer<School>(schoolActions);

export const schoolFeature = createFeature({
  name: 'schools',
  reducer,
});

export const schoolSelectors = createEntitySelectors<School>(schoolFeature.name, adapter);
