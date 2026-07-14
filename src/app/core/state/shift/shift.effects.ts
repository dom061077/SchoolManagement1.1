import { Inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { shiftActions } from './shift.actions';
import { Shift } from '../../model/shift.model';
import { TranslateService } from '@ngx-translate/core';
import { SHIFT_PERSISTENCE_PORT } from '../../ports/shift-persistence-port';
import { IPersistencePort } from '../../ports/persistence-port';

@Injectable()
export class ShiftEffects extends EffectFactory<Shift> {
  constructor(
    actions$: Actions,
    @Inject(SHIFT_PERSISTENCE_PORT) service: IPersistencePort<Shift, number, string, any>,
    translate: TranslateService
  ) {
    super(actions$, shiftActions, service, translate);
  }
}

