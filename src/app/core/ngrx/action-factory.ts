import { createAction, props } from '@ngrx/store';

/**
 * Factory for CRUD actions.
 * Uses createAction for full type safety and no literal-type restriction.
 */
export function createCrudActions<T>(entity: string) {
  const prefix = `[${entity}]`;

  return {
    loadAll: createAction(`${prefix} Load All`, props<{offset:number,limit: number, qfilter:string, sorts:string}>),
    loadAllSuccess: createAction(`${prefix} Load All Success`, props<{ items: T[] }>()),
    loadAllFailure: createAction(`${prefix} Load All Failure`, props<{ error: any }>()),

    create: createAction(`${prefix} Create`, props<{ item: T }>()),
    createSuccess: createAction(`${prefix} Create Success`, props<{ item: T }>()),
    createFailure: createAction(`${prefix} Create Failure`, props<{ error: any }>()),

    update: createAction(`${prefix} Update`, props<{ item: T }>()),
    updateSuccess: createAction(`${prefix} Update Success`, props<{ item: T }>()),
    updateFailure: createAction(`${prefix} Update Failure`, props<{ error: any }>()),

    delete: createAction(`${prefix} Delete`, props<{ id: string | number }>()),
    deleteSuccess: createAction(`${prefix} Delete Success`, props<{ id: string | number }>()),
    deleteFailure: createAction(`${prefix} Delete Failure`, props<{ error: any }>()),
  };
}
