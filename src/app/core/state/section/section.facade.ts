import { FacadeBase, CrudState } from "@app/core/ngrx";
import { Section } from "@app/core/model/section.model";
import { Store } from "@ngrx/store";
import { sectionActions } from "./section.actions";
import { sectionSelectors } from "./section.reducer";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SectionFacade extends FacadeBase<Section> {
    constructor(store: Store<{ feature: CrudState<Section> }>) {
        super(store, sectionActions, sectionSelectors);
    }
}