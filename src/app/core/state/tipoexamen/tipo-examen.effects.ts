import { TipoExamen } from "@app/core/model/tipo-examen.model";
import { EffectFactory } from "@app/core/ngrx";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Actions } from "@ngrx/effects";
import { tipoExamenActions } from "./tipo-examen.actions";
import { TipoExamenService } from "@app/infra/api/tipo-examen.service";


@Injectable()
export class TipoExamenEffects extends EffectFactory<TipoExamen> {
    constructor(action$: Actions, service: TipoExamenService, translate: TranslateService) {
        super(action$, tipoExamenActions, service, translate);
    }
}