import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PersonModel } from "../person.model";
import { personAdapter } from "./person.state";

const getpersonstate = createFeatureSelector<PersonModel>('person');

const personSelector = personAdapter.getSelectors();

export const getpersonlist = createSelector(getpersonstate, personSelector.selectAll)

const selectedentities = createSelector(getpersonstate, personSelector.selectEntities)

export const getperson = (id: number) => createSelector(selectedentities,     (state) => state[id]);

export const getErrormessage=createSelector(getpersonstate,
    (state)=>state.errormessage
);

export const getTotalRows =createSelector(getpersonstate,
    (state)=>state.totalRows
);