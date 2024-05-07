import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PersonService } from "../../service/person.service";
import { createAction } from "@ngrx/store";
import { pdfREPORTgenerate, pdfREPORTsuccess } from "./pdfreport.actions";
import { emptyaction, showalert } from "./app.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { deletePERSONsuccess, deleteePERSON } from "../../person/store/person.actions";

@Injectable()
export class PdfReportEffects{
    constructor(private action$: Actions, private service: PersonService){

    }

    _pdfREPORTgenerate = createEffect(()=>
       
        this.action$.pipe(
            ofType(pdfREPORTgenerate),
            switchMap((action) => {
                return this.service.getPersonCertificate(action.id).pipe(
                    switchMap((data: Blob)=>{
                        return of(pdfREPORTsuccess({payload:data}));
                    }),
                    catchError((_error)=>{
                       console.log('Error descargando PDF',_error);
                       return of(showalert({message: 'Ocurrió un error al descargar el PDF '+_error, resulttype:'fail'}));
                    })
                )
            })
        )
    )
}