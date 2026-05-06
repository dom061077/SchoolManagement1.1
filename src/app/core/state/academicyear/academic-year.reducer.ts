import { createEntitySelectors } from "@app/core/ngrx/selectors-factory";
import { createEntityReducer } from "@app/core/ngrx/reducer-factory";
import { AcademicYear } from "@app/core/model/academic-year.model";
import { academicYearActions } from "./academic-year.actions";
import { createFeature } from "@ngrx/store";

const { reducer, adapter, initialState } = createEntityReducer<AcademicYear>(academicYearActions);

export const academicYearFeature = createFeature({
    name: 'academicYear',
    reducer,
});

export const academicYearSelectors = createEntitySelectors<AcademicYear>(academicYearFeature.name, adapter);