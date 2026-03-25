import { Department } from "@app/core/model/department.model";
import { createEntityReducer } from "@app/core/ngrx";
import { departmentActions } from "./department.actions";


const { reducer, adapter, initialState } = createEntityReducer<Department>(departmentActions);

export const departmentFeature = {
    name: 'department',
    reducer,
  };
 
  export const departmentSelectors = adapter.getSelectors();