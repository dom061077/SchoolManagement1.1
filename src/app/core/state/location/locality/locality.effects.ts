import { Injectable } from "@angular/core";
import { Locality } from "@app/core/model/locality.model";
import { EffectFactory } from "@app/core/ngrx";
import { LocaltyService } from "@app/infra/api/localty.service";
import { Actions } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { localityActions } from "@app/core/state/location/locality/locality.actions";



@Injectable()
export class LocalityEffects extends EffectFactory<Locality>{
    constructor(actions$: Actions, service: LocaltyService, translate: TranslateService) {
      super(actions$, localityActions, service, translate);
    }
  
    
}

