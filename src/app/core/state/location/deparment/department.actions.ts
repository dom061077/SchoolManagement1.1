import { Deparment } from "@app/core/model/deparment.model";
import { createCrudActions } from "@app/core/ngrx";

export const deparmentActions = createCrudActions<Deparment>('Department');