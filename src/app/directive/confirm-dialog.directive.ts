import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../component/dialog/confirm-dialog/confirm-dialog.component';

@Directive({
  selector: '[appConfirmDialog]'
})
export class ConfirmDialogDirective {
  @Input() message = 'Are you sure?';
  @Output() confirmed = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  @HostListener('click', ['$event'])
  async onClick(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: this.message }
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.confirmed.emit();
    }
  }
}

