import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { IPersistencePort } from '../ports/persistence-port';
import * as NotificationActions from '../state/notification/notification.actions'; // Import NotificationActions
import { TranslateService } from '@ngx-translate/core';


export class EffectFactory<T> {
  constructor(
    public actions$: Actions,
    private crudActions: any,
    private service: IPersistencePort<T>,
    private translate: TranslateService
    /*{
      list: () => any;
      create: (item: T) => any;
      update: (item: T) => any;
      delete: (id: string | number) => any;
    }*/
  ) { }

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.loadAll),
      switchMap((action: { pageIndex: number; pageSize: number; qfilter: string; sorts: string; loperator: string }) =>
        this.service.list(action.pageIndex, action.pageSize, action.qfilter, action.sorts, action.loperator).pipe(
          tap((response) => console.log('[Effect] API response:', response)),
          map((response) => {
            return this.crudActions.loadAllSuccess({ items: response.content, total: response.totalElements });
          }),
          catchError((e) => of(this.crudActions.loadAllFailure({ error: e.error })))
        )
      )
    )
  );

  loadInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.loadInstance),
      switchMap((action) =>
        this.service.getById(action.id).pipe(
          map((response) => {
            return this.crudActions.loadInstanceSuccess(response);
          }),
          catchError((e) => of(this.crudActions.loadInstanceFailure({ error: e.error })))
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
  createSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.createSuccess),
      map((action) => {
        return this.crudActions.loadAll({ pageIndex: 0, pageSize: 10, qfilter: '', sorts: '' });
      })
    )
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.update),
      mergeMap(({ item }) =>
        this.service.update(item.id, item).pipe(
          mergeMap((updated) => [
            this.crudActions.updateSuccess({ item: updated }),
            NotificationActions.showNotification({ message: this.translate.instant('NOTIFICATION.UPDATED_SUCCESS'), kind: 'success' })
          ])
          , catchError((error) => {
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
      map((action) => {
        return this.crudActions.loadAll({ pageIndex: 0, pageSize: 10, qfilter: '', sorts: '' });
      })
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

/*
dispatch(action)
      ↓
   actions$
      ↓
  [Effect is already subscribed]
      ↓
  ofType filters
      ↓
  pipe operators run
      ↓
  (optional) new action returned

What NgRx handles for you:
✔ Subscriptions
✔ Lifecycle (destroy/unsubscribe)
✔ Dispatching returned actions
✔ Error handling (internally)

switchMap
mergeMap
concatMap
exhaustMap

  */