import { Province } from "@app/core/model/province.model";
import { FacadeBase } from "@app/core/ngrx";
import { EntityState } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { provinceActions } from "./province.actions";
import { provinceSelectors } from "./province.redurers";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProvinceFacade extends FacadeBase<Province>{
    constructor(store: Store<{ feature: EntityState<Province> }>) {
      super(store, provinceActions, provinceSelectors);
    }
  
    
  }