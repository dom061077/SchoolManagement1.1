import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { selectCurrentNotification } from '../../core/state/notification/notification.selectors';
import * as NotificationActions from '../../core/state/notification/notification.actions';

@Component({
  selector: 'app-notification',
  template: ''
})
export class NotificationComponent implements OnDestroy {
  sub: Subscription;

  constructor(private store: Store, private snackBar: MatSnackBar) {
    this.sub = this.store.select(selectCurrentNotification).subscribe((n) => {
      if (n?.message) {
        this.snackBar.open(n.message, 'OK', { duration: 5000, panelClass: ['snack-' + (n.kind || 'info')] });
        this.store.dispatch(NotificationActions.clearNotification());
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
