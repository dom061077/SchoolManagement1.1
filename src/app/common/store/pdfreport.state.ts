export interface PdfReportState {
    loading: boolean;
    pdfReport: Blob | null;
    error: string | null;
};
//https://github.com/leelanarasimha/ngrx-counter/blob/master/src/app/counter/counter.module.ts
export const initialPdfReportState: PdfReportState = {
    loading: false,
    pdfReport: null,
    error: null
};