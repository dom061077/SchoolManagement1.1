import { createAction,props } from "@ngrx/store";
import { Person } from "../person.model";
import { Update } from "@ngrx/entity";


export const LOAD_PERSON='[PERSON page]load PERSON'
export const LOAD_PERSON_SUCCESS='[PERSON page]load PERSON success'
export const LOAD_PERSON_FAIL='[PERSON page]load PERSON fail'
export const LOAD_PERSON_TOTALROWS='[PERSON page]load PERSON totalrows'
export const ADD_PERSON='[PERSON page]add PERSON'
export const ADD_PERSON_SUCCESS='[PERSON page]add PERSON success'
export const UPDATE_PERSON='[PERSON page]update PERSON'
export const UPDATE_PERSON_SUCCESS='[PERSON page]update PERSON success'

export const DELETE_PERSON='[PERSON page]delete PERSON'
export const DELETE_PERSON_SUCCESS='[PERSON page]delete PERSON success'

export const GET_PERSON='[PERSON page]get PERSON'
export const GET_PERSON_SUCCESS='[PERSON page]get PERSON success'
export const OPEN_POPUP_PERSON='[PERSON page]open popup' 


export const loadPERSON=createAction(LOAD_PERSON,props<{offset:number,limit: number, qfilter:string, sorts:string}>())
export const loadPERSONsuccess=createAction(LOAD_PERSON_SUCCESS,props<{list:Person[], totalCount: number}>())
export const loadPERSONfail=createAction(LOAD_PERSON_FAIL,props<{errormessage:string}>())
export const loadPERSONtotalrows=createAction(LOAD_PERSON_TOTALROWS,props<{totalRows: number}>())

export const addPERSON=createAction(ADD_PERSON,props<{inputdata:Person}>())
export const addPERSONsuccess=createAction(ADD_PERSON_SUCCESS,props<{inputdata:Person}>())

export const updatePERSON=createAction(UPDATE_PERSON,props<{inputdata:Person}>())
export const updatePERSONsuccess=createAction(UPDATE_PERSON_SUCCESS,props<{inputdata:Update<Person>}>())

export const deleteePERSON=createAction(DELETE_PERSON,props<{code:number}>())
export const deletePERSONsuccess=createAction(DELETE_PERSON_SUCCESS,props<{code:number}>())

export const getPERSON=createAction(GET_PERSON,props<{id:number}>())
export const getPERSONsuccess=createAction(GET_PERSON_SUCCESS,props<{obj:Person}>())

export const openpopupPERSON=createAction(OPEN_POPUP_PERSON);