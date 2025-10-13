// autocomplete.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AutocompleteService } from '../../infra/api/autocomplete.service';
import * as AutocompleteActions from '../../core/state/autocomplete/autocomplete.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AutocompleteEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AutocompleteActions.searchItems),
      mergeMap(({ query }) =>
        this.service.search(query).pipe(
          map((results) =>
            AutocompleteActions.searchItemsSuccess({ results })
          ),
          catchError((error) =>
            of(AutocompleteActions.searchItemsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: AutocompleteService
  ) {}
}
