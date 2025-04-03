import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserProfileState } from "./user-profile.state";
import {  Router } from "@angular/router";
import * as UserProfileActions from './user-profile.actions';
import { exhaustMap, map, switchMap } from "rxjs/operators";
import { UserProfileService } from "../../service/user-profile.service";
import { Injectable } from "@angular/core";


@Injectable()
export class UserProfileEffects {
    constructor(private action$: Actions, private service: UserProfileService, private router: Router){

    }

    loadProfile$ = createEffect(()=>

        this.action$.pipe(
            ofType(UserProfileActions.loadProfile),
            exhaustMap(()=>{
                return this.service.getUserProfile().pipe(map((profile:any)=>
                     UserProfileActions.loadProfileSuccess({profile})
                ))
                
            })
     
    ))

}


