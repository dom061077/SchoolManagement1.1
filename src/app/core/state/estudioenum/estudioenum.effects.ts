import { inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { EffectFactory } from "../../ngrx/effect-factory";
import { estudioenumActions } from "./estudioenum.actions";
import { EstudioEnum } from "../../model/estudioenum.model";
import { EstudioEnumService } from "../../../infra/api/estudioenum.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class EstudioenumEffects extends EffectFactory<EstudioEnum> {
    constructor(actions$: Actions, service: EstudioEnumService, translate: TranslateService) {
        super(actions$, estudioenumActions, service,translate);
    }
}