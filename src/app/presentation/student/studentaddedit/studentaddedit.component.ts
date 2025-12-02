import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../../../core/model/student.model';
import * as NotificationActions from '../../../core/state/notification/notification.actions';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EstudioEnum } from '../../../core/model/estudioenum.model';
import { Observable } from 'rxjs';
import { estudioenumSelectors } from '../../../core/state/estudioenum/estudioenum.reducer';
import { StudentFacade } from '../../../core/state/student/student.facade';
import { EstudioEnumFacade } from '../../../core/state/estudioenum/estudioenum.facade';

// Define a shape for the raw form data, where everything is a string or null/undefined
interface RawStudentData {
    [key: string]: any; // A simple index signature to allow all fields
}


@Component({
  selector: 'app-studentaddedit',
  templateUrl: './studentaddedit.component.html',
  styleUrl: './studentaddedit.component.css'
})
export class StudentaddeditComponent implements OnInit {


  
  title: string = 'STUDENT.ADD_STUDENT';
  isedit = false;
  dialogdata : any;
  editcode!: number;
  editdata!: Student;  
  estudioEnumData$: Observable<EstudioEnum[]>;
  estudioEnumError$: Observable<any>;

    advisorDocForm = this.builder.group({
      apellidoTutor: [''],
      nombreTutor: [''],
      estudioPrimarioTutor: [''],
      estudioSecundarioTutor: [''],
      estudioTerUnivTutor: [''],
      dniTutor: ['',Validators.pattern(/^\d{8}$/)],
      cuilTutor: ['', Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)],
      parentescoTutor: ['']
    });


    personalDataForm = this.builder.group({

      id: [''],
      lastName: ['',Validators.required],
      firstName: ['', Validators.required],
      birthDate: ['', Validators.required],
      // Regex:
        // ^      : Start of string
        // \d+    : One or more digits (0-9). Use \d* for optional.
        // $      : End of string      
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      //cuil: [''],
      direccion: [''],
      planSocial: [''],
      trabaja: [''],
      localidad: [''],
      telefono1: [''],
      telefono2: [''],

    });

    personDocForm = this.builder.group({
      fotoDni: [''],
      constanciaCuil: [''],
      constancia6grado: [''],
      actaNacimiento: [''],
      constanciaRegular: [''],
      foto4x4: [''],

    });

    additionalDocForm = this.builder.group({
      fotoCarnetVac: [''],
      fichaMedica: [''],
      aptitudFisica: [''],
      grupoSanguineo: [''],
      fichaInscripcion: [''],
      libreta6grado: [''],
      fotocopiaLibroMatriz: ['']

    });




  get lastNameControl() : AbstractControl | null{
    return this.personalDataForm.get('lastName');
  }

  get dniControl() : AbstractControl | null{
    return this.personalDataForm.get('dni');
  }

  constructor( private facade: StudentFacade, private estudioEnumFacade: EstudioEnumFacade, private builder: FormBuilder, private translate: TranslateService, private ref: MatDialogRef<StudentaddeditComponent>
     ,@Inject(MAT_DIALOG_DATA) public data:any, private store: Store){
      this.title = this.translate.instant(this.title);
      this.estudioEnumData$ = this.store.select(estudioenumSelectors.selectAll) as Observable<EstudioEnum []>;  
      this.estudioEnumError$ = this.store.select(estudioenumSelectors.selectError) as Observable<any>;  
    }  

  
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.translate.instant(this.dialogdata.title);
    this.editcode = this.dialogdata.editcode;
    this.estudioEnumFacade.loadAll(0,100,'','');
    
  }

 transformRawDataToStudent(rawData: any): Student {
    const student: Student = {} as Student;

    // --- 1. HANDLE PERSONAL DATA ---
    student.id = rawData.id ? parseInt(rawData.id, 10) : 0; // Convert to number, use 0 as default if needed
    student.lastName = rawData.lastName || '';
    student.firstName = rawData.firstName || '';
    
    // Dates from forms often come as strings, convert to Date object
    student.birthDate = rawData.birthDate ? new Date(rawData.birthDate) : new Date(0); 
    
    // DNI/Number fields conversion
    student.dni = rawData.dni ? parseInt(rawData.dni, 10) : 0;
    student.cuil = rawData.cuil || '';

    // Other string fields
    student.direccion = rawData.direccion || '';
    student.localidad = rawData.localidad || '';
    student.telefono1 = rawData.telefono1 || '';
    student.telefono2 = rawData.telefono2 || '';

    // Boolean fields conversion (Forms often return 'true', 'false', or ''/null/undefined)
    student.planSocial = rawData.planSocial === true || rawData.planSocial === 'true';
    student.trabaja = rawData.trabaja === true || rawData.trabaja === 'true';

    // --- 2. HANDLE BOOLEAN DOCUMENTATION FIELDS ---
    // All document fields are optional booleans. 
    // If the form field is a checkbox, it might be true/false. If it's a file path string, it might be non-empty string.
    // Assuming you check if the string value exists to determine 'true'
    const booleanDocFields = [
        'fotoDni', 'constanciaCuil', 'constancia6grado', 'actaNacimiento', 'constanciaRegular', 'foto4x4',
        'fotoCarnetVac', 'fichaMedica', 'aptitudFisica', 'grupoSanguineo', 'fichaInscripcion', 
        'libreta6grado', 'fotocopiaLibroMatriz', 'fotocopiaDniTutor', 'constanciaCuilTutor'
    ];

    booleanDocFields.forEach(field => {
        // Sets boolean to true if the form value is a truthy value (e.g., true, 'true', or a non-empty string file path)
        (student as any)[field] = !!rawData[field]; 
    });


    // --- 3. HANDLE TUTOR DATA ---
    student.apellidoTutor = rawData.apellidoTutor || '';
    student.nombreTutor = rawData.nombreTutor || '';
    student.estudioPrimarioTutor = rawData.estudioPrimarioTutor || '';
    student.estudioSecundarioTutor = rawData.estudioSecundarioTutor || '';
    student.estudioTerUnivTutor = rawData.estudioTerUnivTutor || '';
    student.dniTutor = rawData.dniTutor ? parseInt(rawData.dniTutor, 10) : 0;
    student.cuilTutor = rawData.cuilTutor || '';
    student.parentescoTutor = rawData.parentescoTutor || '';
    
    return student;
}

  onSubmit() {
    if (this.personalDataForm.valid && this.dniControl?.valid && this.lastNameControl?.valid) {
      const rawStudentData = {
        ...this.personalDataForm.value,
        ...this.advisorDocForm.value,
        ...this.personDocForm.value,
        ...this.additionalDocForm.value
      };
      const studentData: Student = this.transformRawDataToStudent(rawStudentData);

      if (this.editcode && this.editcode > 0) {
        studentData.id = this.editcode;
        this.facade.update(studentData);
        this.store.dispatch(NotificationActions.showNotification({ message: this.translate.instant('STUDENT.STUDENT_UPDATED_SUCCESS') }));
      } else {
        this.facade.create(studentData);
        this.store.dispatch(NotificationActions.showNotification({ message: this.translate.instant('STUDENT.STUDENT_ADDED_SUCCESS') }));
      }
      this.ref.close(true);

    }
  }

}



