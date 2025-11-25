import { createReducer, on } from '@ngrx/store';
import * as NotificationActions from './notification.actions';

export const notificationFeatureKey = 'notification';

export interface NotificationState {
  message?: string;
  kind?: 'error' | 'info' | 'success';
  code?: string;
}

export const initialState: NotificationState = {};

export const notificationReducer = createReducer(
  initialState,
  on(NotificationActions.showNotification, (_, payload) => ({ ...payload })),
  on(NotificationActions.clearNotification, () => ({}))
);
