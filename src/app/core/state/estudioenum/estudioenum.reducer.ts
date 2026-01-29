import { createFeature } from "@ngrx/store";
import { EstudioEnum } from "../../model/estudioenum.model";
import { createEntityReducer } from "../../ngrx";
import { estudioenumActions } from "./estudioenum.actions";
import { createEntitySelectors } from "../../ngrx/selectors-factory";

const{reducer,adapter,initialState}=createEntityReducer<EstudioEnum>(estudioenumActions);

export const estudioenumFeature=createFeature({
    name:'estudioenum',
    reducer,
});

export const estudioenumSelectors = createEntitySelectors<EstudioEnum>(estudioenumFeature.name,adapter);
