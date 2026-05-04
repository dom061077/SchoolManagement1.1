import { Injectable } from "@angular/core";
import { Locality } from "@app/core/model/locality.model";
import { EffectFactory } from "@app/core/ngrx";
import { LocalityService } from "@app/infra/api/locality/locality.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { LocalityActions, selectProvince } from "@app/core/state/location/locality/locality.actions";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";



@Injectable()
export class LocalityEffects extends EffectFactory<Locality> {

  constructor(actions$: Actions, private localityService: LocalityService, translate: TranslateService) {
    super(actions$, LocalityActions, localityService, translate);
  }


  /**
     * SPECIFIC EFFECT: Load Departments when a Province is selected
     * This is unique to the Locality domain and not in the Base Factory.
     */
  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalityActions.selectProvince),

      switchMap(({ provinceId }) => {
        if (provinceId === null || provinceId === undefined || provinceId === 0) {
          // If no province is selected, we can either return an empty list or a failure action. Here we choose to return an empty list.
          return of(LocalityActions.loadDepartmentsSuccess({ departments: [] }));
        }
        return this.localityService.getDepartmentsByProvince(provinceId).pipe(
          tap((response) =>
            console.log('[Effect] Load Departments API response:', response)
          ),

          map((response) =>
            LocalityActions.loadDepartmentsSuccess({
              departments: response.content
            })
          ),

          catchError((error) =>
            of(LocalityActions.loadAllFailure({ error }))
          )
        )
      }
      )
    )
  );

  loadLocalities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalityActions.selectDepartment),
      switchMap(({ departmentId }) => {
        if (departmentId === null || departmentId === undefined || departmentId === 0) {
          // If no department is selected, we can either return an empty list or a failure action. Here we choose to return an empty list.
          return of(LocalityActions.loadLocalitiesByDepartmentSuccess({ localities: [] }));
        }
        return this.localityService.getLocalitiesByDepartment(departmentId).pipe(
          //delay(5000), // Simulate network delay for better UX demonstration
          tap((response) =>
            console.log('[Effect] Load Localities API response:', response)
          ),
          map((response) =>
            LocalityActions.loadLocalitiesByDepartmentSuccess({
              localities: response.content
            })
          ),
          catchError((error) =>
            of(LocalityActions.loadAllFailure({ error }))
          )
        );
      })
    )
  );




}

