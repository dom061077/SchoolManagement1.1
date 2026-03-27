
import { createCrudActions } from '@core/ngrx/action-factory';
import { Locality } from '@app/core/model/locality.model';   


export const localityActions = createCrudActions<Locality>('Locality');