import { Store } from "@ngrx/store";
import { EstudioEnum } from "../../model/estudioenum.model";
import { FacadeBase } from "../../ngrx";
import { StudentFacade } from "../student/student.facade";
import { EntityState } from "@ngrx/entity";
import { estudioenumActions } from "./estudioenum.actions";
import { Injectable } from "@angular/core";
import { estudioenumSelectors } from "./estudioenum.reducer";

@Injectable({ providedIn: 'root' })
export class EstudioEnumFacade extends FacadeBase<EstudioEnum> {
    constructor(store: Store<{ feature: EntityState<EstudioEnum> }>) {

        super(store, estudioenumActions, estudioenumSelectors);
    }   
}