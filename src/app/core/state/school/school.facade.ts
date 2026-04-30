import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase, CrudState } from '../../ngrx';
import { School } from '../../model/school.model';
import { schoolActions } from './school.actions';
import { schoolSelectors } from './school.reducer';

@Injectable({ providedIn: 'root' })
export class SchoolFacade extends FacadeBase<School> {
  constructor(store: Store<{ feature: CrudState<School> }>) {
    super(store, schoolActions, schoolSelectors);
  }
}
