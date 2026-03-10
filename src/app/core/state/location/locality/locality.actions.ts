
import { createCrudActions } from '@core/ngrx/action-factory';
import { Localty } from '@app/core/model/localty.model';   


export const localityActions = createCrudActions<Localty>('Locality');