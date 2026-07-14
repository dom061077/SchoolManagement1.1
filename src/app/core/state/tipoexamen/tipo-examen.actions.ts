import { TipoExamen } from "@app/core/model/tipo-examen.model";
import { createCrudActions } from "@app/core/ngrx";


export const tipoExamenActions = createCrudActions<TipoExamen>('TipoExamen');