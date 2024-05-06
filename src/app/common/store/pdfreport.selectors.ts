import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PdfReportState  } from "./pdfreport.state";


const getPDFReportState = createFeatureSelector<PdfReportState>('pdfreport');

export const getLoading = createSelector(getPDFReportState,(state)=>{
    return state.loading;
});

export const getPdfReportBlob = createSelector(getPDFReportState,(state)=>{
    return state.pdfReport;
});

export const getPdfReportError = createSelector(getPDFReportState,(state)=>{
    return state.error;
});


