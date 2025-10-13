// autocomplete.actions.ts
import { createAction, props } from '@ngrx/store';

export const searchItems = createAction(
  '[Autocomplete] Search Items',
  props<{ query: string }>()
);

export const searchItemsSuccess = createAction(
  '[Autocomplete] Search Items Success',
  props<{ results: any[] }>()
);

export const searchItemsFailure = createAction(
  '[Autocomplete] Search Items Failure',
  props<{ error: any }>()
);
