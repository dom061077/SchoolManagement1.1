import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { schoolExamActions } from './school-exam-actions';
import { SchoolExamService } from '../../../infra/api/school-exam.service';
import { SchoolExam } from '../../model/school-exam.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SchoolExamEffects extends EffectFactory<SchoolExam> {
  constructor(actions$: Actions, service: SchoolExamService, translate: TranslateService) {
    super(actions$, schoolExamActions, service, translate);
  }
}
