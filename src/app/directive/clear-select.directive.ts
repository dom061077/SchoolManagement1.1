import { Directive, HostListener, Input } from '@angular/core';
import { MatSelect } from '@angular/material/select';

/**
 * Usage:
 * <mat-select #s ...></mat-select>
 * <button mat-icon-button matSuffix appClearSelect [forSelect]="s">×</button>
 * The directive will clear the selection and close the panel.
 */
@Directive({
  selector: '[appClearSelect]'
})
export class ClearSelectDirective {
  @Input('forSelect') matSelect?: MatSelect;

  constructor() {}

  @HostListener('click')
  clear() {
    if (!this.matSelect) {
      return;
    }

    // Try to clear the underlying FormControl if available
    const control = (this.matSelect as any)._control;
    if (control && typeof control.setValue === 'function') {
      control.setValue(null);
      control.markAsDirty?.();
      control.markAsTouched?.();
    } else {
      // Fallback: set MatSelect value and close
      try {
        (this.matSelect as any).value = null;
      } catch (e) {
        // ignore
      }
    }

    // Close the panel if open
    try {
      this.matSelect.close();
    } catch (e) {
      // ignore
    }
  }
}
