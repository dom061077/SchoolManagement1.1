import { AcademicYear } from "@app/core/model/academic-year.model";
import { createCrudActions } from "@app/core/ngrx";

export const academicYearActions = createCrudActions<AcademicYear>('AcademicYear');