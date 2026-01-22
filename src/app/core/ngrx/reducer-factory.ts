import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CrudState<T> extends EntityState<T> {
  loading: boolean;
  error: any;
}

export function createEntityReducer<T extends { id: string | number }>(actions: any) {
  const adapter: EntityAdapter<T> = createEntityAdapter<T>({
    selectId: (entity) => entity.id.toString(),
  });

  const initialState: CrudState<T> = adapter.getInitialState({
    loading: false,
    error: null,
    pageIndex: 0,
    pageSize: 10,
    total: 0
  });

  const reducer = createReducer(
    initialState,

    // LOAD ALL
    on(actions.loadAll, (state,{pageIndex, pageSize}) => ({ ...state, pageIndex, pageSize, loading: true })),
    on(actions.loadAllSuccess, (state, { items, total }) =>
      adapter.setAll(items, { ...state, total, loading: false })
    ),
    on(actions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CREATE
    on(actions.create, (state) => ({ ...state, loading: true })),
    on(actions.createSuccess, (state, { item }) =>
      adapter.addOne(item, { ...state, loading: false })
    ),
    on(actions.createFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // UPDATE
    on(actions.update, (state) => ({ ...state, loading: true })),
    on(actions.updateSuccess, (state, { item }) =>
      adapter.upsertOne(item, { ...state, loading: false })
    ),
    on(actions.updateFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // DELETE
    on(actions.delete, (state) => ({ ...state, loading: true })),
    on(actions.deleteSuccess, (state, { id }) =>
      adapter.removeOne(id.toString(), { ...state, loading: false })
    ),
    on(actions.deleteFailure, (state, { error }) => ({ ...state, loading: false, error }))
  );

  return { reducer, adapter, initialState };
}
