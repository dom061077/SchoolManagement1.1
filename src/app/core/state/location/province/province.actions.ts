import { Province } from "@app/core/model/province.model";
import { createCrudActions } from "@app/core/ngrx";
import { createAction, props } from "@ngrx/store";


export const provinceActions = createCrudActions<Province>('Province');

