import { EstudioEnum } from "../../model/estudioenum.model";
import { createCrudActions } from "../../ngrx";


export const estudioenumActions = createCrudActions<EstudioEnum>('Estudioenum');