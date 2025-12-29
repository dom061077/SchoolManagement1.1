import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component';
import { DateAdapter } from '@angular/material/core';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class UiService {
  private locale: string = navigator.language;

  constructor(private dialog: MatDialog, private dateAdapter: DateAdapter<Date>) {
    this.setLocale(this.locale);
  }

  confirm(message: string, title: string = 'COMMON.CONFIRM_TITLE', color: string = 'warn') {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title, message, color }
    }).afterClosed();
  }


/** Change the locale for the entire app */
  setLocale(locale: string) {
    this.locale = locale;
  // 1. Update the Angular Material Adapter
    this.dateAdapter.setLocale(locale);

    // 2. IMPORTANT: Update the global Moment.js locale
    // This ensures _createMoment() returns an object with the right locale
    moment.locale(locale);
    // Optional: Save to localStorage to persist after refresh
    //localStorage.setItem('user_locale', locale);
  }

  getDateFormat() {
    const momentData = (this.dateAdapter as any)._createMoment().localeData();
    return momentData.longDateFormat('L');
  }
}