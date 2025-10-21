// core/ngrx/reducer-factory.ts
import { createReducer, on } from '@ngrx/store';
import { CrudActions } from './action-factory';

export interface CrudState<T> {
  items: T[];
  loading: boolean;
  error?: any;
}

export function createEntityReducer<T>(actions: CrudActions<T>) {
  const initialState: CrudState<T> = {
    items: [],
    loading: false
  };

  return createReducer(
    initialState,

    on(actions.loadAll, state => ({ ...state, loading: true })),
    on(actions.loadAllSuccess, (state, { items }) => ({ ...state, loading: false, items })),
    on(actions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(actions.createSuccess, (state, { item }) => ({
      ...state,
      items: [...state.items, item]
    })),

    on(actions.updateSuccess, (state, { item }) => ({
      ...state,
      items: state.items.map(i => (i['id'] === item['id'] ? item : i))
    })),

    on(actions.deleteSuccess, (state, { id }) => ({
      ...state,
      items: state.items.filter(i => i['id'] !== id)
    }))
  );
}
