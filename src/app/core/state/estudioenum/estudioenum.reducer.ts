import { createFeature } from "@ngrx/store";
import { EstudioEnum } from "../../model/estudioenum.model";
import { createEntityReducer } from "../../ngrx";
import { estudioenumActions } from "./estudioenum.actions";

const{reducer,adapter,initialState}=createEntityReducer<EstudioEnum>(estudioenumActions);

export const estudioenumFeature=createFeature({
    name:'estudioenum',
    reducer,
});

const selectFeatureState=(state:any)=>state[estudioenumFeature.name];

const{
    selectAll:selectAllEstudioenums,
    selectEntities:selectEstudioenumEntities,
    selectIds:selectEstudioenumIds,
    selectTotal:selectEstudioenumTotal,
}=adapter.getSelectors(selectFeatureState);
const selectLoading=(state:any)=>selectFeatureState(state)?.loading??false;
const selectError=(state:any)=>selectFeatureState(state)?.error??null;
export const estudioenumSelectors={
    selectAll:selectAllEstudioenums,
    selectEntities:selectEstudioenumEntities,
    selectIds:selectEstudioenumIds,
    selectTotal:selectEstudioenumTotal,
    selectLoading,
    selectError,
};

