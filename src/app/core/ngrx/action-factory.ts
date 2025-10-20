import { createAction, props } from '@ngrx/store';

export function createCrudActions<T>(entity: string) {
  return {
    load: createAction(`[${entity}] Load ${entity}s`),
    loadSuccess: createAction(`[${entity}] Load ${entity}s Success`, props<{ data: T[] }>()),
    loadFailure: createAction(`[${entity}] Load ${entity}s Failure`, props<{ error: any }>()),

    create: createAction(`[${entity}] Create ${entity}`, props<{ data: T }>()),
    createSuccess: createAction(`[${entity}] Create ${entity} Success`, props<{ data: T }>()),
    createFailure: createAction(`[${entity}] Create ${entity} Failure`, props<{ error: any }>()),
  };
}
