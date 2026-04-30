import { Component, Inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { StudentRegistration } from '../../../core/model/student-registration.model';
import { StudentRegistrationFacade } from '../../../core/state/student-registration/student-registration.facade';
import { studentRegistrationSelectors } from '../../../core/state/student-registration/student-registration-reducer';
import { ShiftFacade } from '@app/core/state/shift/shift.facade';
import { shiftSelectors } from '@app/core/state/shift/shift.reducer';
import { Shift } from '@app/core/model/shift.model';
import { StudentFacade } from '@app/core/state/student/student.facade';
import { studentSelectors } from '@app/core/state/student/student-reducer';
import { Student } from '@app/core/model/student.model';

@Component({
  selector: 'app-student-registration-add-edit',
  templateUrl: './student-registration-add-edit.component.html',
  styleUrls: ['./student-registration-add-edit.component.css']
})
export class StudentRegistrationAddEditComponent implements OnInit {

  selectEntities = this.store.selectSignal(studentRegistrationSelectors.selectEntities) as Signal<{ [id: number]: StudentRegistration }>;
  shiftData = this.store.selectSignal(shiftSelectors.selectAll) as Signal<Shift[]>;
  title: string = 'STUDENT_REGISTRATION.ADD_REGISTRATION';
  editcode!: number;
  readonly: boolean = false;
  toDelete: boolean = false;
  studentData = this.store.selectSignal(studentSelectors.selectAll) as Signal<Student[]>;

  registrationForm = this.builder.group({
    id: [''],
    studentId: ['', Validators.required],
    academicYearId: ['', Validators.required],
    gradeLevelId: ['', Validators.required],
    shiftId: ['', Validators.required],
    sectionId: ['', Validators.required]
  });

  constructor(
    private facade: StudentRegistrationFacade,
    private shiftFacade: ShiftFacade,
    private studentFacade: StudentFacade,
    private builder: FormBuilder,
    private translate: TranslateService,
    public ref: MatDialogRef<StudentRegistrationAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: number, title: string, readOnly: boolean, toDelete: boolean },
    private store: Store
  ) {
    this.title = this.translate.instant(this.data.title);
  }

  ngOnInit(): void {
    this.editcode = this.data.code;
    this.shiftFacade.loadAll(0, 100, '[]', '[]', 'AND');
    this.studentFacade.loadAll(0, 100, '[]', '[]', 'AND');
    if (this.editcode && this.editcode > 0) {
      const entity = this.selectEntities()[this.editcode];
      if (entity) {
        this.populateForm(entity);
      }
      this.readonly = this.data.readOnly;
      this.toDelete = this.data.toDelete;
      if (this.readonly) {
        this.registrationForm.disable();
      }
    }
  }

  populateForm(registration: StudentRegistration) {
    this.registrationForm.patchValue({
      id: registration.id?.toString() || '',
      studentId: registration.studentId?.toString() || '',
      academicYearId: registration.academicYearId?.toString() || '',
      gradeLevelId: registration.gradeLevelId?.toString() || '',
      shiftId: registration.shiftId?.toString() || '',
      sectionId: registration.sectionId?.toString() || ''
    });
  }

  transformToRegistration(): StudentRegistration {
    const rawData = this.registrationForm.value;
    return {
      id: rawData.id ? parseInt(rawData.id, 10) : 0,
      studentId: rawData.studentId ? parseInt(rawData.studentId, 10) : undefined,
      academicYearId: rawData.academicYearId ? parseInt(rawData.academicYearId, 10) : undefined,
      gradeLevelId: rawData.gradeLevelId ? parseInt(rawData.gradeLevelId, 10) : undefined,
      shiftId: rawData.shiftId ? parseInt(rawData.shiftId, 10) : undefined,
      sectionId: rawData.sectionId ? parseInt(rawData.sectionId, 10) : undefined
    } as StudentRegistration;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const registrationData = this.transformToRegistration();

      if (this.editcode && this.editcode > 0) {
        if (!this.toDelete) {
          registrationData.id = this.editcode;
          this.facade.update(registrationData);
        }
      } else {
        this.facade.create(registrationData);
      }
      this.ref.close(true);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  getControl(name: string): AbstractControl | null {
    return this.registrationForm.get(name);
  }
}
