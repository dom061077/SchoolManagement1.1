import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase, CrudState } from '@app/core/ngrx';
import { Shift } from '@app/core/model/shift.model';
import { shiftActions } from './shift.actions';
import { shiftSelectors } from './shift.reducer';

@Injectable({ providedIn: 'root' })
export class ShiftFacade extends FacadeBase<Shift> {
  constructor(store: Store<{ feature: CrudState<Shift> }>) {
    super(store, shiftActions, shiftSelectors);
  }
}
