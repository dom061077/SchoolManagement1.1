import { Locality } from "@app/core/model/locality.model";
import { CrudState, FacadeBase } from "@app/core/ngrx";
import { EntityState } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { localityActions } from "./locality.actions";
import { localitySelectors } from "./locality.reducer";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocaltyFacade extends FacadeBase<Locality>{
    constructor(store: Store<{ feature: CrudState<Locality> }>) {
      super(store, localityActions, localitySelectors);
    }
  
    
  }