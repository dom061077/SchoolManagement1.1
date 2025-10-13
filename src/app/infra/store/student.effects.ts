import { inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";


@Injectable()
export class StudentEffects {
    constructor(private action$: Actions, private service: StudentService, private route: Router) {

    }
}