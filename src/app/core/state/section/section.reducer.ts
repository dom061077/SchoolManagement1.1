import { createFeature } from "@ngrx/store";
import { createEntityReducer } from "@app/core/ngrx";
import { sectionActions } from "./section.actions";
import { Section } from "../../model/section.model";
import { createEntitySelectors } from "@app/core/ngrx/selectors-factory";





const { reducer, adapter, initialState } = createEntityReducer<Section>(sectionActions);

export const sectionFeature = createFeature({
    name: 'sections',
    reducer,
});

export const sectionSelectors = createEntitySelectors<Section>(sectionFeature.name, adapter);