import { Component, Inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { StudentRegistration } from '@app/core/model/student-registration.model';
import { StudentRegistrationFacade } from '@app/core/state/student-registration/student-registration.facade';
import { studentRegistrationSelectors } from '@app/core/state/student-registration/student-registration-reducer';
import { ShiftFacade } from '@app/core/state/shift/shift.facade';
import { shiftSelectors } from '@app/core/state/shift/shift.reducer';
import { Shift } from '@app/core/model/shift.model';
import { StudentFacade } from '@app/core/state/student/student.facade';
import { studentSelectors } from '@app/core/state/student/student-reducer';
import { Student } from '@app/core/model/student.model';
import { AcademicYearFacade } from '@app/core/state/academicyear/academic-year.facade';
import { academicYearSelectors } from '@app/core/state/academicyear/academic-year.reducer';
import { AcademicYear } from '@app/core/model/academic-year.model';
import { GradeLevelFacade } from '@app/core/state/grade-level/grade-level.facade';
import { gradeLevelSelectors } from '@app/core/state/grade-level/grade-level.reducer';
import { GradeLevel } from '@app/core/model/grade-level.model';
import { SectionFacade } from '@app/core/state/section/section.facade';
import { sectionSelectors } from '@app/core/state/section/section.reducer';
import { Section } from '@app/core/model/section.model';

@Component({
  selector: 'app-student-registration-add-edit',
  templateUrl: './student-registration-add-edit.component.html',
  styleUrls: ['./student-registration-add-edit.component.css']
})
export class StudentRegistrationAddEditComponent implements OnInit {

  selectEntities = this.store.selectSignal(studentRegistrationSelectors.selectEntities) as Signal<{ [id: number]: StudentRegistration }>;
  shiftData = this.store.selectSignal(shiftSelectors.selectAll) as Signal<Shift[]>;
  academicYearData = this.store.selectSignal(academicYearSelectors.selectAll) as Signal<AcademicYear[]>;
  gradeLevelData = this.store.selectSignal(gradeLevelSelectors.selectAll) as Signal<GradeLevel[]>;
  sectionData = this.store.selectSignal(sectionSelectors.selectAll) as Signal<Section[]>;
  title: string = 'STUDENT_REGISTRATION.ADD_REGISTRATION';
  editcode!: number;
  readonly: boolean = false;
  toDelete: boolean = false;
  studentData = this.store.selectSignal(studentSelectors.selectAll) as Signal<Student[]>;

  registrationForm = this.builder.group({
    id: [''],
    studentId: [null as number | null, Validators.required],
    academicYearId: [null as number | null, Validators.required],
    gradeLevelId: [null as number | null, Validators.required],
    shiftId: [null as number | null, Validators.required],
    sectionId: [null as number | null, Validators.required]
  });

  constructor(
    private facade: StudentRegistrationFacade,
    private shiftFacade: ShiftFacade,
    private studentFacade: StudentFacade,
    private academicYearFacade: AcademicYearFacade,
    private gradeLevelFacade: GradeLevelFacade,
    private sectionFacade: SectionFacade,
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
    this.studentFacade.loadAll(0, 100, '[]', '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"} ]', 'AND');
    this.academicYearFacade.loadAll(0, 100, '[]', '[]', 'AND');
    this.gradeLevelFacade.loadAll(0, 100, '[]', '[]', 'AND');
    this.sectionFacade.loadAll(0, 100, '[]', '[]', 'AND');
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
      studentId: Number(registration.studentId) || null,
      academicYearId: Number(registration.academicYearId) || null,
      gradeLevelId: Number(registration.gradeLevelId) || null,
      shiftId: Number(registration.shiftId) || null,
      sectionId: Number(registration.sectionId) || null
    });
  }

  transformToRegistration(): StudentRegistration {
    const rawData = this.registrationForm.value;
    return {
      id: rawData.id ? Number(rawData.id) : null,
      studentId: rawData.studentId ? Number(rawData.studentId) : null,
      academicYearId: rawData.academicYearId ? Number(rawData.academicYearId) : null,
      gradeLevelId: rawData.gradeLevelId ? Number(rawData.gradeLevelId) : null,
      shiftId: rawData.shiftId ? Number(rawData.shiftId) : null,
      sectionId: rawData.sectionId ? Number(rawData.sectionId) : null
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
