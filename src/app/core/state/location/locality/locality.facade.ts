import { Locality } from "@app/core/model/locality.model";
import { CrudState, FacadeBase } from "@app/core/ngrx";
import { EntityState } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { LocalityActions } from "./locality.actions";
import { LocalitySelectors } from "./locality.reducer";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocaltyFacade extends FacadeBase<Locality>{
    constructor(store: Store<{ feature: CrudState<Locality> }>) {
      super(store, LocalityActions, LocalitySelectors);
    }
  
    selectProvince(provinceId: number | string): void {
      this.store.dispatch(LocalityActions.selectProvince({ provinceId }));
    }

    selectDepartment(departmentId: number | string): void {
      this.store.dispatch(LocalityActions.selectDepartment({ departmentId }));
    }
  
    
  }