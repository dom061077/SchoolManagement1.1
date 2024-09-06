import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../service/user.service";
import { beginLogin, beginLogout, beginRegister, duplicateUser, duplicateUserSuccess, fetchmenu, fetchmenusuccess, getroles, getrolesuccess, getuserbycode, getuserbycodesuccess, getusers, getuserssuccess, updateuserrole } from "./user.actions";
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs'
import { emptyaction, showalert } from "../../common/store/app.action";
import { Router } from "@angular/router";
import { Userinfo } from "../user.model";
import { KeycloakService } from "../keycloak/keycloak.service";

@Injectable()
export class UserEffect {
    constructor(private action$: Actions, private service: UserService, private klservice: KeycloakService, private route: Router) {

    }

    /*_userlogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action) => {
                return this.service.userLogin(action.usercred).pipe(
                    switchMap((data: Userinfo) => {
                        if (data) {
                            const _userdata = data;
                            console.log(data);
                            //if (_userdata.status === true) {
                                this.service.setUserToLoaclStorage(_userdata);
                                this.route.navigate([''])
                                return of(fetchmenu(),
                                    showalert({ message: 'Login success.', resulttype: 'pass' }))
                            //} else {
                            //    return of(showalert({ message: 'InActive User.', resulttype: 'fail' }))
                            //}
                        } else {
                            return of(showalert({ message: 'Login Failed: Invalid credentials.', resulttype: 'fail' }))
                        }


                    }), 
                    catchError((_error) => of(showalert({ message: 'Login Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )  */

    _userlogout = createEffect(()=>
        this.action$.pipe(
            ofType(beginLogout),
            switchMap((action)=>{
                this.service.userLogout();
                return of(emptyaction());
            })
        )
    )
    

    _loadmenubyrole = createEffect(() =>
        this.action$.pipe(
            ofType(fetchmenu),
            exhaustMap((action) => {
                return this.service.getMenubyRole().pipe(
                    map((data) => {
                        return fetchmenusuccess({ menulist: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch mmenu list', resulttype: 'fail' })))
                )
            })
        )
    )    
            /*
    _userregister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action) => {
                return this.service.UserRegisteration(action.userdata).pipe(
                    map(() => {
                        this.route.navigate(['login'])
                        return showalert({ message: 'Registered successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _duplicateuser = createEffect(() =>
        this.action$.pipe(
            ofType(duplicateUser),
            switchMap((action) => {
                return this.service.Duplicateusername(action.username).pipe(
                    switchMap((data) => {
                        if (data.length > 0) {
                            return of(duplicateUserSuccess({ isduplicate: true }),
                                showalert({ message: 'Username already exist.', resulttype: 'fail' }))
                        } else {
                            return of(duplicateUserSuccess({ isduplicate: false }))
                        }

                    }),
                    catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )





    _getallusers = createEffect(() =>
        this.action$.pipe(
            ofType(getusers),
            exhaustMap((action) => {
                return this.service.GetAllUsers().pipe(
                    map((data) => {
                        return getuserssuccess({ userlist: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch user list', resulttype: 'fail' })))
                )
            })
        )
    )

    _getallRoles = createEffect(() =>
        this.action$.pipe(
            ofType(getroles),
            exhaustMap((action) => {
                return this.service.GetAllRoles().pipe(
                    map((data) => {
                        return getrolesuccess({ rolelist: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch role list', resulttype: 'fail' })))
                )
            })
        )
    )


    _getuserbycode = createEffect(() =>
        this.action$.pipe(
            ofType(getuserbycode),
            switchMap((action) => {
                return this.service.Duplicateusername(action.username).pipe(
                    switchMap((data) => {
                        if (data.length > 0) {
                            return of(getuserbycodesuccess({ userinfo: data[0] }))
                        } else {
                            return of(duplicateUserSuccess({ isduplicate: false }))
                        }

                    }),
                    catchError((_error) => of(showalert({ message: 'get userbycode Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _assignrole = createEffect(() => null
        this.action$.pipe(
            ofType(updateuserrole),
            switchMap((action) => {
                return this.service.UpdateUser(action.userid,action.userrole).pipe(
                    switchMap(() => {
                        return of(getusers(),showalert({ message: 'Updated successfully',resulttype:'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'get userbycode Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )*/

}