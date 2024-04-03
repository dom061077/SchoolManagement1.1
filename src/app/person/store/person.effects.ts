import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addPerson,listPerson } from './person.actions';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { PersonService } from '../../service/person.service';
import { PersonInfo } from '../person.model';
import { showalert } from '../../common/store/app.action';
import { Userinfo } from '../../auth/user.model';

export class PersonEffect{
    constructor(private action$: Actions, private route: Router, private personService: PersonService){

    }

    _person = createEffect(()=>
        this.action$.pipe(
            ofType(addPerson),
            switchMap((action)=>{
                return this.personService.addPerson(action.personData).pipe(
                    switchMap((data: PersonInfo) => {
                        if (data) {
                            const _userdata = data;
                            console.log(data);

                                return of(showalert({ message: 'El registro se guardó correctamente.', resulttype: 'pass' }))

                        } else {
                            return of(showalert({ message: 'Hubo un error y no se guardó el registro.', resulttype: 'fail' }))
                        }


                    }), 

                    catchError((_error) => of(showalert({ message: 'Login Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )
}
