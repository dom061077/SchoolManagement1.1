import { createReducer, on } from "@ngrx/store";
import { pdfREPORTfailure, pdfREPORTgenerate, pdfREPORTsuccess } from "./pdfreport.actions";
import { initialPdfReportState } from "./pdfreport.state";


const _pdfreportReducer = createReducer(initialPdfReportState,
    on(pdfREPORTgenerate,(state, action)=>{
        return{...state, loading: true, pdfReport: null, error: null }
    }),
    on(pdfREPORTfailure,(state,action)=>{
        return{...state, loading: false, pdfReport: null, error: action.payload}
    }),
    on(pdfREPORTsuccess,(state,action)=>{
        return {...state, loading: false, pdfReport: action.payload, error: null}
    })
)

export function PDFREPORTreducer(state: any, action: any){
    return _pdfreportReducer(state, action);
}