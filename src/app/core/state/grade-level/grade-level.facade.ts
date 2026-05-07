import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { GradeLevel } from "@app/core/model/grade-level.model";
import { FacadeBase, CrudState } from "@app/core/ngrx";
import { gradeLevelActions } from "@app/core/state/grade-level/grade-level.actions";
import { gradeLevelSelectors } from "@app/core/state/grade-level/grade-level.reducer";

@Injectable({ providedIn: 'root' })
export class GradeLevelFacade extends FacadeBase<GradeLevel> {
    constructor(store: Store<{ feature: CrudState<GradeLevel> }>) {
        super(store, gradeLevelActions, gradeLevelSelectors);
    }
}