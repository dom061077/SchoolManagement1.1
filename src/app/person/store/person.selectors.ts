import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PersonModel } from "../person.model";
import { personAdapter } from "./person.state";

const getpersonstate = createFeatureSelector<PersonModel>('customer');

const customerSeletor = personAdapter.getSelectors();

export const getpersonlist = createSelector(getpersonstate, customerSeletor.selectAll)

const selectedentities = createSelector(getpersonstate, customerSeletor.selectEntities)

export const getperson = (id: number) => createSelector(selectedentities, (state) => state[id]);

export const getErrormessage=createSelector(getpersonstate,(state)=>state.errormessage);