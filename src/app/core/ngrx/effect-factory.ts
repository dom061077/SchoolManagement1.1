import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CrudEffects<T> {
  constructor(
    private actions$: Actions,
    private actions: any,
    private service: { list: () => any; create: (data: T) => any }
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.load),
      mergeMap(() =>
        this.service.list().pipe(
          map((data: T[]) => this.actions.loadSuccess({ data })),
          catchError(error => of(this.actions.loadFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.create),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((result: T) => this.actions.createSuccess({ data: result })),
          catchError(error => of(this.actions.createFailure({ error })))
        )
      )
    )
  );
}
