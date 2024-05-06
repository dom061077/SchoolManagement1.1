import { createAction,props } from "@ngrx/store";

export const PDFREPORT_GENERATE = '[PDF report] generate';
export const PDFREPORT_SUCCESS = '[PDF report] generate success';
export const PDFREPORT_FAILURE = '[PDF report] generate failure';

export const pdfREPORTgenerate = createAction(PDFREPORT_GENERATE,props<{id:number}>());
export const pdfREPORTsuccess = createAction(PDFREPORT_SUCCESS, props<{payload:Blob}>());
export const pdfREPORTfailure = createAction(PDFREPORT_FAILURE, props<{payload:string}>());