import { Injectable } from "@angular/core";
import { Locality } from "@app/core/model/locality.model";
import { EffectFactory } from "@app/core/ngrx";
import { LocaltyService } from "@app/infra/api/locality/localty.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { LocalityActions, selectProvince } from "@app/core/state/location/locality/locality.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";



@Injectable()
export class LocalityEffects extends EffectFactory<Locality>{

      constructor(actions$: Actions, private localityService: LocaltyService, translate: TranslateService) {
      super(actions$, LocalityActions, localityService, translate);
    }
  

/**
   * SPECIFIC EFFECT: Load Departments when a Province is selected
   * This is unique to the Locality domain and not in the Base Factory.
   */
  loadDepartments$ = createEffect(() =>
        this.actions$.pipe(
          // 1. Listen for the 'selectProvince' action
          ofType(LocalityActions.selectProvince),
          
          // 2. Call the specific Port (Persistence) to get children
          // We use switchMap to cancel previous requests if the user clicks fast
          switchMap(({ provinceId }) => 
            this.localityService.getDepartmentsByProvince(provinceId).pipe(
              tap((response) => console.log('[Effect] Load Departments API response:', response)),
              // 3. Dispatch the success action with the data
              map((response) => LocalityActions.loadDepartmentsSuccess({ departments: response.content })),
              
              // 4. Handle errors locally so the Effect doesn't "die"
              catchError((error) => of(LocalityActions.loadAllFailure({ error })))
            )
          )
        )

  );

  selectProvince$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LocalityActions.selectProvince)
      )
  );
  

    
}

