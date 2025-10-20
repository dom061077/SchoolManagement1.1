import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export function createEntityReducer<T>(actions: any) {
  const adapter = createEntityAdapter<T>();
  
  const initialState = adapter.getInitialState({
    loading: false,
    error: null
  });

  const reducer = createReducer(
    initialState,
    on(actions.load, state => ({ ...state, loading: true })),
    on(actions.loadSuccess, (state, { data }) => adapter.setAll(data, { ...state, loading: false })),
    on(actions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(actions.createSuccess, (state, { data }) => adapter.addOne(data, state))
  );

  return { reducer, adapter };
}
