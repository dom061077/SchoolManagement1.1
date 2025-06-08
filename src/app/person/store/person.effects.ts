import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Route, Router } from '@angular/router';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { PersonService } from '../../service/person.service';
import { emptyaction, showalert } from '../../common/store/app.action';
import { Userinfo } from '../../auth/user.model';
import { addPERSON, addPERSONsuccess, deletePERSONsuccess, deleteePERSON, getPERSON, getPERSONsuccess, loadPERSON, loadPERSONfail, loadPERSONsuccess, loadPERSONtotalrows, updatePERSON, updatePERSONsuccess } from './person.actions';
import { Person } from '../person.model';
import { Update } from '@ngrx/entity';


@Injectable()
export class PersonEffects {
    constructor(private actin$: Actions, private service:PersonService, private route: Router) {

    }

    _loadPERSON = createEffect(() =>
        this.actin$.pipe(
            ofType(loadPERSON),
            exhaustMap((action) => {
                return this.service.getAll(action.offset,action.limit, action.qfilter,action.sorts).pipe(
                    map((datax) => {
                        return loadPERSONsuccess({ list: datax.data, totalCount: datax.total });
                    }),
                    catchError((_error) => of(loadPERSONfail({ errormessage: _error.message })))
                )
            })
        )
    );

    _loadPERSONsuccess = createEffect(() =>
        this.actin$.pipe(
            ofType(loadPERSONsuccess),
            exhaustMap((action) => {
                return of(loadPERSONtotalrows({totalRows:action.totalCount}));
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
                        return of(addPERSONsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))                        
                        //return of(loadPERSON(),
                        //    showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create CUSTOMER', resulttype: 'fail' })))
                )
            })
        )
    )
    _addedPerson = createEffect(()=>
        this.actin$.pipe(
            ofType(addPERSONsuccess),
            switchMap(() => {
                return of(loadPERSON({offset:0,limit: 5, qfilter: "", sorts:""}))
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
    
    /*_loadPERSONfail = createEffect(() =>
        this.actin$.pipe(
            ofType(loadPERSONfail),
            switchMap(() => {
                this.route.navigate(['login']);
                return of(emptyaction());
            })
        )
    )*/



}