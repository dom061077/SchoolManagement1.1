import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CrudActions } from './action-factory';

@Injectable()
export class CrudEffects<T> {
  constructor(
    private actions$: Actions,
    private service: {
      list: () => any;
      create: (item: T) => any;
      update: (item: T) => any;
      delete: (id: string | number) => any;
    },
    private actions: CrudActions<T>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.loadAll),
      mergeMap(() =>
        this.service.list().pipe(
          map(items => this.actions.loadAllSuccess({ items })),
          catchError(error => of(this.actions.loadAllFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.create),
      mergeMap(({ item }) =>
        this.service.create(item).pipe(
          map(created => this.actions.createSuccess({ item: created })),
          catchError(error => of(this.actions.createFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.update),
      mergeMap(({ item }) =>
        this.service.update(item).pipe(
          map(updated => this.actions.updateSuccess({ item: updated })),
          catchError(error => of(this.actions.updateFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.delete),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => this.actions.deleteSuccess({ id })),
          catchError(error => of(this.actions.deleteFailure({ error })))
        )
      )
    )
  );
}
