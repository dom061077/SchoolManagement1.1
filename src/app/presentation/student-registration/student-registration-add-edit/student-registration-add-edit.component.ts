import { Component, Inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
import { StudentRegistrationLookupFacade } from '@app/core/state/student-registration/student-registration-lookup.facade';

@Component({
  selector: 'app-student-registration-add-edit',
  templateUrl: './student-registration-add-edit.component.html',
  styleUrls: ['./student-registration-add-edit.component.css']
})
export class StudentRegistrationAddEditComponent implements OnInit {

  selectEntities = this.facade.items;
  shiftData = this.lookupFacade.shifts;
  academicYearData = this.lookupFacade.academicYears;
  gradeLevelData = this.lookupFacade.gradeLevels;//this.store.selectSignal(gradeLevelSelectors.selectAll) as Signal<GradeLevel[]>;
  sectionData = this.lookupFacade.sections;//this.store.selectSignal(sectionSelectors.selectAll) as Signal<Section[]>;
  title: string = 'STUDENT_REGISTRATION.ADD_REGISTRATION';
  editcode!: number;
  readonly: boolean = false;
  toDelete: boolean = false;
  studentData = this.studentFacade.items;//this.store.selectSignal(studentSelectors.selectAll) as Signal<Student[]>;
  studentTotal = this.studentFacade.totalRest;//this.store.selectSignal(studentSelectors.selectTotalRest) as Signal<number>;
  studentLoading = this.studentFacade.loading;//this.store.selectSignal(studentSelectors.selectLoading) as Signal<boolean>;
  studentPageSize = 100;
  studentTypeahead$ = new Subject<string>();
  currentStudentTerm = '';
  filterObj: any[] = [];

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
    /*private shiftFacade: ShiftFacade,
    private academicYearFacade: AcademicYearFacade,
    private gradeLevelFacade: GradeLevelFacade,
    private sectionFacade: SectionFacade,*/
    private lookupFacade: StudentRegistrationLookupFacade,
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
    this.lookupFacade.loadAllLookups(0, 100);

    this.studentTypeahead$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.studentFacade.searchStudents(term, this.studentPageSize);
    });
    if (this.editcode && this.editcode > 0) {
      const entity = this.selectEntities()[this.editcode];
      this.filterObj = [];
      this.filterObj.push({ property: "dni:eq", value: entity.studentDni });
      let filter = JSON.stringify(this.filterObj);

      this.studentFacade.loadAll(0, 100, filter, '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"} ]', 'OR');
      if (entity) {
        this.populateForm(entity);
      }
      this.readonly = this.data.readOnly;
      this.toDelete = this.data.toDelete;
      if (this.readonly) {
        this.registrationForm.disable();
      }
    } else {
      this.studentFacade.loadAll(0, this.studentPageSize, '[]', '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"} ]', 'OR');
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

  onScrollStudentToEnd() {
    this.fetchMoreStudents();
  }

  onScrollStudent(event: { start: number; end: number }) {
    // Optional: custom logic during scrolling if required
  }

  onClearStudentTerm() {
    this.studentPageSize = 100;
    this.studentFacade.loadAll(0, this.studentPageSize, '[]', '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"} ]', 'OR');
  }

  private fetchMoreStudents() {
    if (this.studentLoading()) {
      return;
    }
    const total = this.studentTotal();
    if (this.studentData().length < total) {
      this.studentPageSize += 100;
      let filter = '[]';
      filter = JSON.stringify(this.filterObj);
      this.studentFacade.loadAll(0, this.studentPageSize, filter, '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"} ]', 'OR');
    }
  }
}
