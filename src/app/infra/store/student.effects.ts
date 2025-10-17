import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "../api/student.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { loadSTUDENT } from "../../core/state/student/student.actions";
import { exhaustMap } from "rxjs";
import { IPersistencePort } from "../../core/ports/persistence-port";
import { Student } from "../../core/model/student.model";


@Injectable()
export class StudentEffects {
    constructor(private action$: Actions, private service:IPersistencePort<Student,number,string,string> , private route: Router, private translate: TranslateService) {

    }

    loadStudent$ = createEffect(()=>
        this.action$.pipe(
            ofType(loadSTUDENT),
            exhaustMap((action)=>{
                return this.service.list(action.limit,action.offset, action.qfilter).pipe(
                    //map(data=> loadSTUDENTsuccess({list:data})),
                    //catchError((error)=> of(loadSTUDENTfail({errormessage:error.message})))
                )
            })
        )
    );

}