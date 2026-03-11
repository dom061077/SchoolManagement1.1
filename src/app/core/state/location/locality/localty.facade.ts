import { Localty } from "@app/core/model/localty.model";
import { FacadeBase } from "@app/core/ngrx";
import { EntityState } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { localityActions } from "./locality.actions";
import { localitySelectors } from "./localty.reducer";


export class LocaltyFacade extends FacadeBase<Localty>{
    constructor(store: Store<{ feature: EntityState<Localty> }>) {
      super(store, localityActions, localitySelectors);
    }
  
    
  }