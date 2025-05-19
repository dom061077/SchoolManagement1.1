import { createAction, props } from "@ngrx/store";



export const LOAD_STUDENT='[STUDENT page]load STUDENT';
export const LOAD_STUDENT_SUCCESS='[STUDENT page]load STUDENT success';
export const LOAD_STUDENT_FAIL='[STUDENT page]load STUDENT fail';
export const LOAD_STUDENT_TOTALROWS='[STUDENT page]load STUDENT totalrows';
export const ADD_STUDEN='[STUDENT page]add STUDENT';
export const ADD_STUDEN_SUCCESS='[STUDENT page]add STUDENT success';
export const UPDATE_STUDENT='[STUDENT page]update STUDENT';
export const UPDATE_STUDENT_SUCCESS='[STUDENT page]update STUDENT success';
export const DELETE_STUDENT='[STUDENT page]delete STUDENT';
export const DELETE_STUDENT_SUCCESS='[STUDENT page]delete STUDENT success';
export const GET_STUDENT='[STUDENT page]get STUDENT';
export const GET_STUDENT_SUCCESS='[STUDENT page]get STUDENT success';


export const loadSTUDENT=createAction(LOAD_STUDENT,props<{offset:number,limit: number, qfilter:string, sorts:string}>());
export const loadSTUDENTsuccess=createAction(LOAD_STUDENT_SUCCESS,props<{list:any[], totalCount: number}>());
export const loadSTUDENTfail=createAction(LOAD_STUDENT_FAIL,props<{errormessage:string}>());
export const loadSTUDENTtotalrows=createAction(LOAD_STUDENT_TOTALROWS,props<{totalRows: number}>());
export const addSTUDENT=createAction(ADD_STUDEN,props<{inputdata:any}>());
export const addSTUDENTsuccess=createAction(ADD_STUDEN_SUCCESS,props<{inputdata:any}>());
export const updateSTUDENT=createAction(UPDATE_STUDENT,props<{inputdata:any}>());
export const updateSTUDENTsuccess=createAction(UPDATE_STUDENT_SUCCESS,props<{inputdata:any}>());