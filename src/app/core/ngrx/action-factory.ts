import { createAction, props } from '@ngrx/store';

export interface CrudActions<T> {
  loadAll: any;
  loadAllSuccess: any;
  loadAllFailure: any;
  create: any;
  createSuccess: any;
  createFailure: any;
  update: any;
  updateSuccess: any;
  updateFailure: any;
  delete: any;
  deleteSuccess: any;
  deleteFailure: any;
}

export function createCrudActions<T>(entity: string): CrudActions<T> {
  return {
    loadAll: createAction(`[${entity}] Load All`),
    loadAllSuccess: createAction(`[${entity}] Load All Success`, props<{ items: T[] }>()),
    loadAllFailure: createAction(`[${entity}] Load All Failure`, props<{ error: any }>()),

    create: createAction(`[${entity}] Create`, props<{ item: T }>()),
    createSuccess: createAction(`[${entity}] Create Success`, props<{ item: T }>()),
    createFailure: createAction(`[${entity}] Create Failure`, props<{ error: any }>()),

    update: createAction(`[${entity}] Update`, props<{ item: T }>()),
    updateSuccess: createAction(`[${entity}] Update Success`, props<{ item: T }>()),
    updateFailure: createAction(`[${entity}] Update Failure`, props<{ error: any }>()),

    delete: createAction(`[${entity}] Delete`, props<{ id: string | number }>()),
    deleteSuccess: createAction(`[${entity}] Delete Success`, props<{ id: string | number }>()),
    deleteFailure: createAction(`[${entity}] Delete Failure`, props<{ error: any }>()),
  };
}
