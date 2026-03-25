import { Injectable } from "@angular/core";
import { Department } from "@app/core/model/department.model";
import { EffectFactory } from "@app/core/ngrx";
import { departmentActions } from "./department.actions";
import { TranslateService } from "@ngx-translate/core";
import { Actions } from "@ngrx/effects";
import { DepartmentService } from "@app/infra/api/department.service";


@Injectable({ providedIn: 'root' })
export class DepartmentEffects extends EffectFactory<Department>{
    constructor(actions$: Actions, service: DepartmentService, translate: TranslateService) {
      super(actions$, departmentActions, service, translate);
    }
  
    
}