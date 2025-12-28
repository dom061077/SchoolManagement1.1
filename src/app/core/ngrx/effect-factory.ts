import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { IPersistencePort } from '../ports/persistence-port';
import * as NotificationActions from '../state/notification/notification.actions'; // Import NotificationActions
import { TranslateService } from '@ngx-translate/core';


export class EffectFactory<T> {
  constructor(
    private actions$: Actions,
    private crudActions: any,
    private service: IPersistencePort<T>,
    private translate: TranslateService
    /*{
      list: () => any;
      create: (item: T) => any;
      update: (item: T) => any;
      delete: (id: string | number) => any;
    }*/
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.loadAll),
      switchMap((action: { offset: number; limit: number; qfilter: string; sorts: string }) =>
        this.service.list(action.offset,action.limit, action.qfilter,action.sorts).pipe(
          tap((response) => console.log('[Effect] API response:', response)),
          map((response) => {
            return this.crudActions.loadAllSuccess({ items:response.data })
          }),
          catchError((e) => of(this.crudActions.loadAllFailure({ error:e.error })))
        )
      )
    )
  );

  loadInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.loadInstance),
      switchMap(( action )=>
        this.service.getById(action.id).pipe(
          map((response) => {
            return this.crudActions.loadInstanceSuccess(response);
          }),
          catchError((e) => of(this.crudActions.loadInstanceFailure({error: e.error})))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.create),
      mergeMap(({ item }) =>
        this.service.create(item).pipe(
          mergeMap((created) => [
             this.crudActions.createSuccess({ item: created }),
             NotificationActions.showNotification({ message: this.translate.instant('NOTIFICATION.CREATED_SUCCESS'), kind: 'success' })
          ]),
          catchError((error) => of(this.crudActions.createFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.update),
      mergeMap(({ item }) =>
        this.service.update(item.id, item).pipe(
          map((updated) =>{
            return  this.crudActions.updateSuccess({ item: updated });      
            

          })
          ,catchError((error) =>{
            //return of(this.crudActions.updateFailure({ error }))
            return of(NotificationActions.showNotification({ message: this.translate.instant('NOTIFICATION.UPDATE_ERROR. '), kind: 'error' }))
          })
        )
      )
    )
  );

  updateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.updateSuccess),   
      map(() => NotificationActions.showNotification({ message: this.translate.instant('NOTIFICATION.UPDATED_SUCCESS'), kind: 'success' }))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.delete),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => this.crudActions.deleteSuccess({ id })),
          catchError((error) => of(this.crudActions.deleteFailure({ error })))
        )
      )
    )
  );
}
