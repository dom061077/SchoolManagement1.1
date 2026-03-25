import { Inject, Injectable } from "@angular/core";
import { Deparment } from "@app/core/model/department.model";
import { CrudState, FacadeBase } from "@app/core/ngrx";
import { Store } from "@ngrx/store";
import { deparmentActions } from "./department.actions";

@Injectable({ providedIn: 'root' })
export class DeparmentFacade extends FacadeBase<Deparment>{
    constructor(store: Store<{ feature: CrudState<Deparment>}>){
        super(store, deparmentActions, deparmentSelectors);
    }
}