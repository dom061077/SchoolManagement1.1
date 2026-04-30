import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { schoolActions } from './school.actions';
import { SchoolService } from '../../../infra/api/school.service';
import { School } from '../../model/school.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SchoolEffects extends EffectFactory<School> {
  constructor(actions$: Actions, service: SchoolService, translate: TranslateService) {
    super(actions$, schoolActions, service, translate);
  }
}
