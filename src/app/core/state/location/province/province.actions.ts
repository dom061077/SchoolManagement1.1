import { Province } from "@app/core/model/province.model";
import { createCrudActions } from "@app/core/ngrx";


export const provinceActions = createCrudActions<Province>('Province');