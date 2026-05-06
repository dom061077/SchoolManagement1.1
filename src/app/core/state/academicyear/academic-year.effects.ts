import { Actions } from "@ngrx/effects";
import { EffectFactory } from "@app/core/ngrx/effect-factory";
import { AcademicYear } from "@app/core/model/academic-year.model";
import { academicYearActions } from "./academic-year.actions";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
import { AcademicYearService } from "@app/infra/api/academic-year.service";

@Injectable()
export class AcademicYearEffects extends EffectFactory<AcademicYear> {
    constructor(actions$: Actions, service: AcademicYearService, translate: TranslateService) {
        super(actions$, academicYearActions, service, translate);
    }
}