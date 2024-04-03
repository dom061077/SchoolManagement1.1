import { createAction,props } from "@ngrx/store";
import { PersonInfo } from "../person.model";

export const ADD = '[person] add person';
export const LIST = '[person] list person';

export const addPerson = createAction(ADD,props<{personData: PersonInfo}>());
export const listPerson = createAction(LIST,props<{personList: PersonInfo[]}>());