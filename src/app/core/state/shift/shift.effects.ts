import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { shiftActions } from './shift.actions';
import { ShiftService } from '../../../infra/api/shift.service';
import { Shift } from '../../model/shift.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ShiftEffects extends EffectFactory<Shift> {
  constructor(actions$: Actions, service: ShiftService, translate: TranslateService) {
    super(actions$, shiftActions, service, translate);
  }
}
