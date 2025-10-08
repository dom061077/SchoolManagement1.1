// autocomplete.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AutocompleteActions from './autocomplete.actions';

export interface AutocompleteState {
  results: any[];
  loading: boolean;
  error: any;
}

const initialState: AutocompleteState = {
  results: [],
  loading: false,
  error: null,
};

export const autocompleteReducer = createReducer(
  initialState,
  on(AutocompleteActions.searchItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(AutocompleteActions.searchItemsSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    results,
  })),
  on(AutocompleteActions.searchItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
