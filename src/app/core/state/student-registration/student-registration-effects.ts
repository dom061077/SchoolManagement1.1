import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { studentRegistrationActions } from './student-registration-actions';
import { StudentRegistrationService } from '../../../infra/api/student-registration.service';
import { StudentRegistration } from '../../model/student-registration.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class StudentRegistrationEffects extends EffectFactory<StudentRegistration> {
  constructor(actions$: Actions, service: StudentRegistrationService, translate: TranslateService) {
    super(actions$, studentRegistrationActions, service, translate);
  }
}
