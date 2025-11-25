import { Actions, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import * as NotificationActions from './notification.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions) {}

  failureToNotification$ = createEffect(() =>
    this.actions$.pipe(
      filter((action: Action & { error?: any }) => {
        const t = action.type;
        // Only actions that end with 'Failure' and are not notification actions
        return t.endsWith('Failure') && !t.startsWith('[Notification]');
      }),
      map((action: any) => {
        const message = extractMessageFromAction(action);
        return NotificationActions.showNotification({ message, kind: 'error' });
      })
    )
  );
}

function extractMessageFromAction(action: any): string {
  const err = action.error ?? action.payload ?? null;
  if (!err) return 'Unexpected error';
  if (typeof err === 'string') return err;
  if (err.message) return err.message;
  if (err.status && err.statusText) return `${err.status} ${err.statusText}`;
  try {
    return JSON.stringify(err);
  } catch {
    return 'Unexpected error';
  }
}
