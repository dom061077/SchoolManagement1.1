import { Section } from "@app/core/model/section.model";
import { createCrudActions } from "@app/core/ngrx";

export const sectionActions = createCrudActions<Section>('Section');