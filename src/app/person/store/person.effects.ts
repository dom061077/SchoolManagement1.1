import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { PersonService } from '../../service/person.service';
import { showalert } from '../../common/store/app.action';
import { Userinfo } from '../../auth/user.model';
import { addPERSON, addPERSONsuccess, deletePERSONsuccess, deleteePERSON, getPERSON, getPERSONsuccess, loadPERSON, loadPERSONfail, loadPERSONsuccess, updatePERSON, updatePERSONsuccess } from './person.actions';
import { Person } from '../person.model';
import { Update } from '@ngrx/entity';

@Injectable()
export class PersonEffects {
    constructor(private actin$: Actions, private service:PersonService) {

    }

    _loadPERSON = createEffect(() =>
        this.actin$.pipe(
            ofType(loadPERSON),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadPERSONsuccess({ list: data })
                    }),
                    catchError((_error) => of(loadPERSONfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getPERSON = createEffect(() =>
        this.actin$.pipe(
            ofType(getPERSON),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {
                        return getPERSONsuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addPERSON = createEffect(() =>
        this.actin$.pipe(
            ofType(addPERSON),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(loadPERSON(),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create CUSTOMER', resulttype: 'fail' })))
                )
            })
        )
    )
    _updatePERSON = createEffect(() =>
        this.actin$.pipe(
            ofType(updatePERSON),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        const updatedrecord: Update<Person> = {
                            id: action.inputdata.id,
                            changes: action.inputdata
                        }
                        return of(updatePERSONsuccess({ inputdata: updatedrecord }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update CUSTOMER', resulttype: 'fail' })))
                )
            })
        )
    )
    _deletePERSON = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteePERSON),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deletePERSONsuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete CUSTOMER', resulttype: 'fail' })))
                )
            })
        )
    )



}