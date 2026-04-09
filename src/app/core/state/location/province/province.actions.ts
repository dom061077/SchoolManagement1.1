import { Province } from "@app/core/model/province.model";
import { createCrudActions } from "@app/core/ngrx";
import { createAction, props } from "@ngrx/store";


export const ProvinceActions = createCrudActions<Province>('Province');

export const selectProvince = createAction(
  '[Province] Select Province',
  props<{ provinceId: number | string }>()
);

export const loadDepartments = createAction(
  '[Province] Load Departments',
  props<{ provinceId: number | string }>()
);

export const loadDepartmentsSuccess = createAction(
  '[Province] Load Departments Success',
  props<{ departments: any[] }>()
);

export const selectDepartment = createAction(
  '[Province] Select Department',
  props<{ departmentId: number | string }>()
);


