import { inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { EffectFactory } from "../../ngrx/effect-factory";
import { estudioenumActions } from "./estudioenum.actions";
import { EstudioEnum } from "../../model/estudioenum.model";
import { EstudioEnumService } from "../../../infra/api/estudioenum.service";

@Injectable()
export class EstudioenumEffects extends EffectFactory<EstudioEnum> {
    constructor(actions$: Actions, service: EstudioEnumService) {
        super(actions$, estudioenumActions, service);
    }
}