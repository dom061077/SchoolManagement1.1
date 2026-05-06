import { AcademicYear } from "@app/core/model/academic-year.model";
import { FacadeBase, CrudState } from "@app/core/ngrx";
import { Store } from "@ngrx/store";
import { academicYearActions } from "./academic-year.actions";
import { academicYearSelectors } from "./academic-year.reducer";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AcademicYearFacade extends FacadeBase<AcademicYear> {
    constructor(store: Store<{ feature: CrudState<AcademicYear> }>) {
        super(store, academicYearActions, academicYearSelectors);
    }
}