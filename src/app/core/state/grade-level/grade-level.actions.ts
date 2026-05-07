import { createCrudActions } from "@app/core/ngrx";
import { GradeLevel } from "@app/core/model/grade-level.model";


export const gradeLevelActions = createCrudActions<GradeLevel>('GradeLevel');