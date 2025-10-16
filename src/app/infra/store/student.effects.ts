import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "../api/student.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { loadSTUDENT } from "../../core/state/student/student.actions";
import { exhaustMap } from "rxjs";


@Injectable()
export class StudentEffects {
    constructor(private action$: Actions, private service: StudentService, private route: Router, private translate: TranslateService) {

    }

    loadStudent$ = createEffect(()=>
        this.action$.pipe(
            ofType(loadSTUDENT),
            exhaustMap((action))
        )
    );

}