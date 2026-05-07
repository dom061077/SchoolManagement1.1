import { Actions } from "@ngrx/effects";
import { EffectFactory } from "@app/core/ngrx/effect-factory";
import { GradeLevel } from "@app/core/model/grade-level.model";
import { gradeLevelActions } from "./grade-level.actions";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
import { GradeLevelService } from "@app/infra/api/grade-level.service";

@Injectable()
export class GradeLevelEffects extends EffectFactory<GradeLevel> {
    constructor(actions$: Actions, service: GradeLevelService, translate: TranslateService) {
        super(actions$, gradeLevelActions, service, translate);
    }
}