import { Province } from "@app/core/model/province.model";
import { createEntityReducer } from "@app/core/ngrx";
import { createEntitySelectors } from "@app/core/ngrx/selectors-factory";
import { createFeature } from "@ngrx/store";
import { provinceActions } from "./province.actions";


const { reducer, adapter, initialState } = createEntityReducer<Province>(provinceActions);

export const provinceFeature = createFeature({
  name: 'province',
  reducer,
});


export const provinceSelectors = createEntitySelectors<Province>(provinceFeature.name, adapter);


