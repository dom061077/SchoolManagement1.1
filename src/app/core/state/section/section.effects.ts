import { Section } from "@app/core/model/section.model";
import { EffectFactory } from "@app/core/ngrx";
import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { SectionService } from "@app/infra/api/section.service";
import { sectionActions } from "./section.actions";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class SectionEffects extends EffectFactory<Section> {
    constructor(actions$: Actions, service: SectionService, translate: TranslateService) {
        super(actions$, sectionActions, service, translate);
    }
}