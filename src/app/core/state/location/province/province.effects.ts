import { EffectFactory } from "@app/core/ngrx";
import { provinceActions } from "./province.actions";
import { Province } from "@app/core/model/province.model";
import { TranslateService } from "@ngx-translate/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProvinceService } from "@app/infra/api/province.service";
import { Injectable } from "@angular/core";


@Injectable()
export class ProvinceEffects extends EffectFactory<Province>{
    constructor(actions$: Actions, service: ProvinceService, translate: TranslateService) {
      super(actions$, provinceActions, service, translate);
    }
  

}