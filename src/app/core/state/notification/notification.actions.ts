import { createAction, props } from '@ngrx/store';

export const showNotification = createAction(
  '[Notification] Show',
  props<{ message: string; kind?: 'error' | 'info' | 'success'; error?: string }>()
);

export const clearNotification = createAction('[Notification] Clear');
