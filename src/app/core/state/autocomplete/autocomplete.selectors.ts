// autocomplete.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AutocompleteState } from './autocomplete.reducer';

export const selectAutocompleteState =
  createFeatureSelector<AutocompleteState>('autocomplete');

export const selectResults = createSelector(
  selectAutocompleteState,
  (state) => state.results
);

export const selectLoading = createSelector(
  selectAutocompleteState,
  (state) => state.loading
);
