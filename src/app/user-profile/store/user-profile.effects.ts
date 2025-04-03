import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserProfileState } from "./user-profile.state";
import { Route } from "@angular/router";
import * as UserProfileActions from './user-profile.actions';
import { exhaustMap, switchMap } from "rxjs/operators";
import { UserProfileService } from "../../service/user-profile.service";


export class ProfileEffects {
    constructor(private action$: Actions, private service: UserProfileService, private route: Route){

    }

    loadProfile$ = createEffect(()=>
        this.action$.pipe(
            ofType(UserProfileActions.loadProfile),
            exhaustMap((action)=>
                this.service.getMenuRole()
            );
        );
    );

}


