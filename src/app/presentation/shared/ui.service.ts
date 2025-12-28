import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private dialog: MatDialog) {}

  confirm(message: string, title: string = 'COMMON.CONFIRM_TITLE', color: string = 'warn') {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title, message, color }
    }).afterClosed();
  }
}