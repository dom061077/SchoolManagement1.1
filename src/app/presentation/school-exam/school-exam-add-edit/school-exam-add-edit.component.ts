import { Component, Inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SchoolExam, SchoolExamDetail } from '../../../core/model/school-exam.model';
import { SchoolExamFacade } from '../../../core/state/school-exam/school-exam.facade';
import { schoolExamSelectors } from '../../../core/state/school-exam/school-exam-reducer';
import { StudentRegistrationFacade } from '../../../core/state/student-registration/student-registration.facade';
import { studentRegistrationSelectors } from '../../../core/state/student-registration/student-registration-reducer';
import { StudentRegistration } from '../../../core/model/student-registration.model';

@Component({
  selector: 'app-school-exam-add-edit',
  templateUrl: './school-exam-add-edit.component.html',
  styleUrls: ['./school-exam-add-edit.component.css']
})
export class SchoolExamAddEditComponent implements OnInit {
  selectEntities = this.store.selectSignal(schoolExamSelectors.selectEntities) as Signal<{ [id: number]: SchoolExam }>;
  registrationsData = this.store.selectSignal(studentRegistrationSelectors.selectAll) as Signal<StudentRegistration[]>;

  title: string = 'SCHOOL_EXAM.ADD_EXAM';
  editcode!: number;
  readonly: boolean = false;
  toDelete: boolean = false;

  examForm: FormGroup;

  // Mock structures for lists since there are no distinct APIs
  mockTipoExamen = [
    { id: 1, name: 'Examen Parcial' },
    { id: 2, name: 'Examen Final' },
    { id: 3, name: 'Trabajo Práctico' },
    { id: 4, name: 'Coloquio' }
  ];

  mockSubjects = [
    { id: 101, name: 'Matemáticas' },
    { id: 102, name: 'Lengua y Literatura' },
    { id: 103, name: 'Historia' },
    { id: 104, name: 'Física' },
    { id: 105, name: 'Química' }
  ];

  mockTeachers = [
    { id: 501, name: 'Prof. Gómez Carlos' },
    { id: 502, name: 'Prof. Rodríguez María' },
    { id: 503, name: 'Prof. López Ana' }
  ];

  mockAcademicPeriods = [
    { id: 1, name: 'Primer Trimestre' },
    { id: 2, name: 'Segundo Trimestre' },
    { id: 3, name: 'Tercer Trimestre' }
  ];

  constructor(
    private facade: SchoolExamFacade,
    private registrationFacade: StudentRegistrationFacade,
    private builder: FormBuilder,
    private translate: TranslateService,
    public ref: MatDialogRef<SchoolExamAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: number, title: string, readOnly: boolean, toDelete: boolean },
    private store: Store
  ) {
    this.title = this.translate.instant(this.data.title);

    this.examForm = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      date: [null, Validators.required],
      tipoExamenId: [null, Validators.required],
      academicPeriodId: [null, Validators.required],
      subjectId: [null, Validators.required],
      teacherId: [null, Validators.required],
      details: this.builder.array([])
    });
  }

  ngOnInit(): void {
    this.editcode = this.data.code;

    // Load student registrations to populate grading lines
    this.registrationFacade.loadAll(0, 100, '[]', '[]', 'AND');

    if (this.editcode && this.editcode > 0) {
      const entity = this.selectEntities()[this.editcode];
      if (entity) {
        this.populateForm(entity);
      }
      this.readonly = this.data.readOnly;
      this.toDelete = this.data.toDelete;
      if (this.readonly) {
        this.examForm.disable();
      }
    }
  }

  get details(): FormArray {
    return this.examForm.get('details') as FormArray;
  }

  createDetailFormGroup(detail?: SchoolExamDetail): FormGroup {
    return this.builder.group({
      id: [detail?.id || null],
      studentRegistrationId: [detail?.studentRegistrationId || null, Validators.required],
      score: [detail?.score || null, [Validators.required, Validators.min(0), Validators.max(10)]],
      academicPeriodId: [detail?.academicPeriodId || this.examForm.value.academicPeriodId || null]
    });
  }

  findDetailFormGroupById(id: number): FormGroup | undefined {
    return this.details.controls.find(control => control.get('id')?.value === id) as FormGroup | undefined;
  }

  addDetailRow() {
    this.details.push(this.createDetailFormGroup());
  }

  removeDetailRow(index: number) {
    this.details.removeAt(index);
  }

  populateForm(exam: SchoolExam) {
    this.examForm.patchValue({
      id: exam.id?.toString() || '',
      name: exam.name,
      description: exam.description,
      date: exam.date ? new Date(exam.date) : null,
      tipoExamenId: exam.tipoExamenId,
      academicPeriodId: exam.academicPeriodId,
      subjectId: exam.subjectId,
      teacherId: exam.teacherId
    });

    // Populate Details FormArray
    this.details.clear();
    if (exam.details && exam.details.length > 0) {
      exam.details.forEach(detail => {
        this.details.push(this.createDetailFormGroup(detail));
      });
    }
  }

  transformToExam(): SchoolExam {
    const rawData = this.examForm.value;

    // Format date as YYYY-MM-DD
    let formattedDate = '';
    if (rawData.date) {
      const d = new Date(rawData.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
    }

    // Map details list
    const detailsList: SchoolExamDetail[] = (rawData.details || []).map((d: any) => ({
      id: d.id ? Number(d.id) : null,
      schoolExamId: rawData.id ? Number(rawData.id) : null,
      academicPeriodId: Number(rawData.academicPeriodId),
      score: Number(d.score),
      studentRegistrationId: Number(d.studentRegistrationId)
    }));

    // Find names from mock lists to populate helpers if needed
    const selectedTipo = this.mockTipoExamen.find(t => t.id === Number(rawData.tipoExamenId));
    const selectedSubj = this.mockSubjects.find(s => s.id === Number(rawData.subjectId));

    return {
      id: rawData.id ? Number(rawData.id) : null,
      name: rawData.name,
      description: rawData.description,
      date: formattedDate,
      tipoExamenId: Number(rawData.tipoExamenId),
      tipoExamenName: selectedTipo ? selectedTipo.name : '',
      academicPeriodId: Number(rawData.academicPeriodId),
      subjectId: Number(rawData.subjectId),
      subjectName: selectedSubj ? selectedSubj.name : '',
      teacherId: Number(rawData.teacherId),
      details: detailsList
    } as SchoolExam;
  }

  onSubmit() {
    if (this.examForm.valid) {
      const examData = this.transformToExam();

      if (this.editcode && this.editcode > 0) {
        if (!this.toDelete) {
          examData.id = this.editcode;
          this.facade.update(examData);
        }
      } else {
        this.facade.create(examData);
      }
      this.ref.close(true);
    } else {
      this.examForm.markAllAsTouched();
    }
  }
}
