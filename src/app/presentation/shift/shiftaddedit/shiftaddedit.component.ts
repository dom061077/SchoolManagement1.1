import { Component, Inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShiftFacade } from '../../../core/state/shift/shift.facade';
import { shiftSelectors } from '../../../core/state/shift/shift.reducer';
import { Shift } from '../../../core/model/shift.model';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-shiftaddedit',
  templateUrl: './shiftaddedit.component.html',
  styleUrls: ['./shiftaddedit.component.css']
})
export class ShiftaddeditComponent implements OnInit, OnDestroy {
  selectEntities = this.store.selectSignal(shiftSelectors.selectEntities) as Signal<{ [id: number]: Shift }>;
  title = '';
  shiftForm!: FormGroup;
  shiftData!: Shift;
  readonly = false;
  toDelete = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private facade: ShiftFacade,
    private dialogRef: MatDialogRef<ShiftaddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private translate: TranslateService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.title = this.translate.instant(this.data.title);
    this.readonly = this.data.readOnly;
    this.toDelete = this.data.toDelete;

    this.shiftForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: this.readonly }, Validators.required]
    });

    if (this.data.code > 0) {
      const shift = this.selectEntities()[this.data.code];
      if (shift) {
        this.shiftData = shift;
        this.shiftForm.patchValue({
          id: shift.id,
          name: shift.name
        });
      }
    }
  }

  onSubmit() {
    if (this.shiftForm.valid) {
      const shift: Shift = {
        id: this.data.code,
        name: this.shiftForm.get('name')?.value
      };

      if (this.data.code > 0) {
        this.facade.update(shift);
      } else {
        this.facade.create(shift);
      }
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get nameControl() {
    return this.shiftForm.get('name');
  }
}
