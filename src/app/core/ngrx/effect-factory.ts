import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { IPersistencePort } from '../ports/persistence-port';
import { DataSource } from '../model/datasource.model';

@Injectable()
export class CrudEffects<T> {
  constructor(
    private actions$: Actions,
    private actions: any,
    private service: IPersistencePort<T>
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.actions.load),
      exhaustMap((action) =>
        this.service.list(action.offset, action.limit,  action.qfilter, action.qsort).pipe(
          map((data: DataSource<T>) => this.actions.loadSuccess({ data })),
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
