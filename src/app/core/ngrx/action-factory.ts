// core/ngrx/action-factory.ts
import { createAction, props } from '@ngrx/store';

export interface CrudActions<T> {
  loadAll: ReturnType<typeof createAction>;
  loadAllSuccess: ReturnType<typeof createAction>;
  loadAllFailure: ReturnType<typeof createAction>;
  create: ReturnType<typeof createAction>;
  createSuccess: ReturnType<typeof createAction>;
  createFailure: ReturnType<typeof createAction>;
  update: ReturnType<typeof createAction>;
  updateSuccess: ReturnType<typeof createAction>;
  updateFailure: ReturnType<typeof createAction>;
  delete: ReturnType<typeof createAction>;
  deleteSuccess: ReturnType<typeof createAction>;
  deleteFailure: ReturnType<typeof createAction>;
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
