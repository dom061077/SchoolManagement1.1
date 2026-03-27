// locality.actions.ts
import { createAction, props } from '@ngrx/store';
import { createCrudActions } from '@app/core/ngrx/action-factory';
import { Locality } from '@app/core/model/locality.model';

// A) Generate the Standard CRUD Actions (Load All, Create, Update, Delete)
// This gives us the actions for the 24,000 items
export const LocalityCrudActions = createCrudActions<Locality>('Locality');

// B) Define the Specific "Cascade" Actions
// These are unique to the Location domain
export const selectProvince = createAction(
  '[Locality] Select Province',
  props<{ provinceId: number | string }>()
);

export const loadDepartments = createAction(
  '[Locality] Load Departments',
  props<{ provinceId: number | string }>()
);

export const loadDepartmentsSuccess = createAction(
  '[Locality] Load Departments Success',
  props<{ departments: any[] }>()
);

export const selectDepartment = createAction(
  '[Locality] Select Department',
  props<{ departmentId: number | string }>()
);

// C) Export them all together so the Facade and Reducer can find them
export const LocalityActions = {
  ...LocalityCrudActions,
  selectProvince,
  loadDepartments,
  loadDepartmentsSuccess,
  selectDepartment
};