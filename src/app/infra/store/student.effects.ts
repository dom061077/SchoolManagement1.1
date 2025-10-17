import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "../api/student.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { catchError, exhaustMap, map, of } from "rxjs";
import { IPersistencePort } from "../../core/ports/persistence-port";
import { Student } from "../../core/model/student.model";
import { loadStudents, loadStudentsSuccess, loadStudentFail } from "../../core/state/student/student.actions";


@Injectable()
export class StudentEffects {
    constructor(private action$: Actions, private service:IPersistencePort<Student,number,string,string> , private route: Router, private translate: TranslateService) {

    }

    loadStudents$ = createEffect(()=>
        this.action$.pipe(
            ofType(loadStudents),
            exhaustMap((action)=>{
                return this.service.list(action.offset,action.limit, action.qfilter,action.sorts).pipe(
                    map(dataSource=> loadStudentsSuccess({list:dataSource.data, totalCount: dataSource.total})),
                    catchError((error)=> of(loadStudentFail({errormessage:error.message})))
                )
            })
        )
    );

    getStudent$ = createEffect(()=>
        this.action$.pipe(
            //ofType(getS)
        )
    );

}