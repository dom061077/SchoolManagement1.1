import { createEntityReducer } from "@app/core/ngrx/reducer-factory";
import { createEntitySelectors } from "@app/core/ngrx/selectors-factory";
import { createFeature } from "@ngrx/store";
import { GradeLevel } from "@app/core/model/grade-level.model";
import { gradeLevelActions } from "./grade-level.actions";

const { reducer, adapter, initialState } = createEntityReducer<GradeLevel>(gradeLevelActions);

export const gradeLevelFeature = createFeature({
    name: 'gradeLevel',
    reducer,
});

export const gradeLevelSelectors = createEntitySelectors<GradeLevel>(gradeLevelFeature.name, adapter);