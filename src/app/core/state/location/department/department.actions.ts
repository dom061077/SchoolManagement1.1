import { Department } from "@app/core/model/department.model";
import { createCrudActions } from "@app/core/ngrx";

export const departmentActions = createCrudActions<Department>('Department');