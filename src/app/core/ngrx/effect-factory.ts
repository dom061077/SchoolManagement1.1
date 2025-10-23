import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IPersistencePort } from '../ports/persistence-port';


export class EffectFactory<T> {
  constructor(
    private actions$: Actions,
    private crudActions: any,
    private service: IPersistencePort<T>/*{
      list: () => any;
      create: (item: T) => any;
      update: (item: T) => any;
      delete: (id: string | number) => any;
    }*/
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.loadAll),
      mergeMap((action) =>
        this.service.list(action.offset,action.limit, action.qfilter,action.sorts).pipe(
          map((items) => this.crudActions.loadAllSuccess({ items })),
          catchError((error) => of(this.crudActions.loadAllFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.crudActions.create),
      mergeMap(({ item }) =>
        this.service.create(item).pipe(
          map((created) => this.crudActions.createSuccess({ item: created })),
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
          map((updated) => this.crudActions.updateSuccess({ item: updated })),
          catchError((error) => of(this.crudActions.updateFailure({ error })))
        )
      )
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
