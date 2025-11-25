import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState, notificationFeatureKey } from './notification.reducer';

const selectNotificationFeature = createFeatureSelector<NotificationState>(notificationFeatureKey);

export const selectCurrentNotification = createSelector(
  selectNotificationFeature,
  (s) => s
);
