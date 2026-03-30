import { Injectable } from "@angular/core";
import { Locality } from "@app/core/model/locality.model";
import { EffectFactory } from "@app/core/ngrx";
import { LocaltyService } from "@app/infra/api/localty.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { LocalityActions } from "@app/core/state/location/locality/locality.actions";
import { of, switchMap } from "rxjs";



@Injectable()
export class LocalityEffects extends EffectFactory<Locality>{

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
          // 3. Dispatch the success action with the data
          map(departments => LocalityActions.loadDepartmentsSuccess({ departments })),
          
          // 4. Handle errors locally so the Effect doesn't "die"
          catchError(error => of(LocalityActions.loadAllFailure({ error })))
        )
      )
    )
  );

    constructor(actions$: Actions, service: LocaltyService, translate: TranslateService) {
      super(actions$, LocalityActions, service, translate);
    }
  
    
}

