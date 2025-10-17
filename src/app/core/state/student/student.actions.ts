import { createAction, props } from "@ngrx/store";



export const LOAD_STUDENTS='[STUDENT page]load STUDENT';
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


export const loadStudents=createAction(LOAD_STUDENTS,props<{offset:number,limit: number, qfilter:string, sorts:string}>());
export const loadStudentsSuccess=createAction(LOAD_STUDENT_SUCCESS,props<{list:any[], totalCount: number}>());
export const loadStudentFail=createAction(LOAD_STUDENT_FAIL,props<{errormessage:string}>());
export const addStudent=createAction(ADD_STUDEN,props<{inputdata:any}>());
export const addStudentSuccess=createAction(ADD_STUDEN_SUCCESS,props<{inputdata:any}>());
export const updateStudent=createAction(UPDATE_STUDENT,props<{inputdata:any}>());
export const updateStudentSuccess=createAction(UPDATE_STUDENT_SUCCESS,props<{inputdata:any}>());
//export const getStudent=createAction(GET_STUDENT,props<{}>());