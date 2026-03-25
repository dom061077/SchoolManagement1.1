import { createCrudActions } from '@core/ngrx/action-factory';
import { Localty } from '@app/core/model/localty.model';
import { createFeature } from '@ngrx/store';
import { createEntityReducer } from '@app/core/ngrx';
import { localityActions } from './locality.actions';
import { createEntitySelectors } from '@app/core/ngrx/selectors-factory';


const { reducer, adapter, initialState } = createEntityReducer<Localty>(localityActions);

/*
  In the below snippet code I define the LocaltyFeature will be used in student module to register the store feature
  
*/

export const localityFeature = createFeature({
  name: 'locality',
  reducer,
});


export const localitySelectors = createEntitySelectors<Localty>(localityFeature.name, adapter);


