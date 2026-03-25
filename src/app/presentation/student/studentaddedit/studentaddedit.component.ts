import { Component, Inject, OnInit, Signal } from '@angular/core';
import { Student } from '../../../core/model/student.model';
import * as NotificationActions from '../../../core/state/notification/notification.actions';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EstudioEnum } from '../../../core/model/estudioenum.model';
import { Observable } from 'rxjs';
import { estudioenumSelectors } from '../../../core/state/estudioenum/estudioenum.reducer';
import { StudentFacade } from '../../../core/state/student/student.facade';
import { EstudioEnumFacade } from '../../../core/state/estudioenum/estudioenum.facade';
import { studentSelectors } from '../../../core/state/student/student-reducer';
import { UiService } from '../../shared/ui.service';
import { Localty } from '@app/core/model/localty.model';
import { localitySelectors } from '@app/core/state/location/locality/localty.reducer';
import { LocaltyFacade } from '@app/core/state/location/locality/localty.facade';
import { Province } from '@app/core/model/province.model';
import { provinceSelectors } from '@app/core/state/location/province/province.reducer';
import { ProvinceFacade } from '@app/core/state/location/province/province.facade';

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

  selectEntities = this.store.selectSignal(studentSelectors.selectEntities) as Signal<{[id: number]: Student}>;
  dateformat: string;
  title: string = 'STUDENT.ADD_STUDENT';
  dialogdata : any;
  editcode!: number;
  editdata!: Student;  
  readonly: boolean = false;
  toDelete: boolean = false;
  estudioEnumData: Signal<EstudioEnum[]>;
  localtyData: Signal<Localty[]> ;
  provinceData: Signal<Province[]>;
  //estudioEnumError$: Observable<any>;


    advisorDocForm = this.builder.group({
      apellidoTutor: [''],
      nombreTutor: [''],
      estudioPrimarioTutor: [''],
      estudioSecundarioTutor: [''],
      estudioTerUnivTutor: [''],
      dniTutor: ['',Validators.pattern(/^\d{8}$/)],
      cuilTutor: [''/*, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)*/],
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


populateForms(student: Student) {
  // 1. Transform the Student object into the flattened rawData object
  const rawData = this.transformStudentToRawData(student);

  // 2. Use patchValue() on each form group to populate it
  //    It will only set the values for controls that exist in the group
  this.personalDataForm.patchValue(rawData);
  this.advisorDocForm.patchValue(rawData);
  this.personDocForm.patchValue(rawData);
  this.additionalDocForm.patchValue(rawData);
}

  get lastNameControl() : AbstractControl | null{
    return this.personalDataForm.get('lastName');
  }

  get dniControl() : AbstractControl | null{
    return this.personalDataForm.get('dni');
  }

  constructor( private facade: StudentFacade, private provinceFacade: ProvinceFacade, private localtyFacade: LocaltyFacade, private estudioEnumFacade: EstudioEnumFacade, private builder: FormBuilder, private translate: TranslateService, private ref: MatDialogRef<StudentaddeditComponent>
     ,@Inject(MAT_DIALOG_DATA) public data:{code:number, title: string}
     , private store: Store, private dialog: MatDialog, private uiService: UiService) {
      this.title = this.translate.instant(this.title);
      this.estudioEnumData = this.store.selectSignal(estudioenumSelectors.selectAll) as Signal<EstudioEnum []>;  
      this.localtyData = this.store.selectSignal(localitySelectors.selectAll as unknown as Signal<Localty []> );
      this.provinceData = this.store.selectSignal(provinceSelectors.selectAll) as Signal<Province []>;
      this.dateformat = this.uiService.getDateFormat();

    }  

  
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.translate.instant(this.dialogdata.title);
    this.editcode = this.dialogdata.code;
    this.estudioEnumFacade.loadAll(0,100,'[]','[]','AND');
    this.localtyFacade.loadAll(0,100,'[]','[]','AND');
    this.provinceFacade.loadAll(0,100,'[]','[]','AND');
    

    /*
    this.store.select(studentSelectors.selectEntities).subscribe(entities => {
      this.populateForms(entities[this.editcode] as Student);
      this.markFormasAsTouched();
    });
    */
    if(this.editcode && this.editcode > 0){
      this.populateForms(this.selectEntities()[this.editcode] as Student);
      this.readonly = this.dialogdata.readOnly;
      this.toDelete = this.dialogdata.toDelete;
      if (this.readonly){
        this.personalDataForm.disable();
        this.advisorDocForm.disable();
        this.personDocForm.disable();
        this.additionalDocForm.disable();
      }
    }
    
  }

transformStudentToRawData(student: Student): RawStudentData {
    const rawData: RawStudentData = {};
    // --- 1. HANDLE PERSONAL DATA ---
    rawData['id'] = student?.id?.toString() || '';
    rawData['lastName'] = student.lastName || '';
    rawData['firstName'] = student.firstName || '';
    rawData['birthDate'] = student.birthDate ? student.birthDate : '';//student.birthDate ? student.birthDate.toISOString().substring(0,10) : '';
    rawData['dni'] = student.dni?.toString() || '';
    rawData['cuil'] = student.cuil || '';
    rawData['direccion'] = student.direccion || '';
    rawData['planSocial'] = student.planSocial;
    rawData['trabaja'] = student.trabaja;
    rawData['localidad'] = student.localidad || '';
    rawData['telefono1'] = student.telefono1 || '';
    rawData['telefono2'] = student.telefono2 || '';
    // --- 2. HANDLE BOOLEAN DOCUMENTATION FIELDS ---
    const booleanDocFields = [
        'fotoDni', 'constanciaCuil', 'constancia6grado', 'actaNacimiento', 'constanciaRegular', 'foto4x4',
        'fotoCarnetVac', 'fichaMedica', 'aptitudFisica', 'grupoSanguineo', 'fichaInscripcion',  
        'libreta6grado', 'fotocopiaLibroMatriz', 'fotocopiaDniTutor', 'constanciaCuilTutor'
    ];
    booleanDocFields.forEach(field => {
        rawData[field] = (student as any)[field];
    });
    // --- 3. HANDLE TUTOR DATA ---
    rawData['apellidoTutor'] = student.apellidoTutor || '';
    rawData['nombreTutor'] = student.nombreTutor || '';
    rawData['estudioPrimarioTutor'] = student.estudioPrimarioTutor || null;
    rawData['estudioSecundarioTutor'] = student.estudioSecundarioTutor || null ;
    rawData['estudioTerUnivTutor'] = student.estudioTerUnivTutor || null;
    rawData['dniTutor'] = student.dniTutor?.toString() || '';
    rawData['cuilTutor'] = student.cuilTutor || '';
    rawData['parentescoTutor'] = student.parentescoTutor || '';
    return rawData;
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
    student.dni = rawData.dni ? parseInt(rawData.dni, 10) : null;
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
    student.estudioPrimarioTutor = rawData.estudioPrimarioTutor || null;
    student.estudioSecundarioTutor = rawData.estudioSecundarioTutor || null ;
    student.estudioTerUnivTutor = rawData.estudioTerUnivTutor || null;
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
        if(this.toDelete){
          this.dialog
        }else{
          studentData.id = this.editcode;
          this.facade.update(studentData);
          //this.store.dispatch(NotificationActions.showNotification({ message: this.translate.instant('STUDENT.STUDENT_UPDATED_SUCCESS') }));
        }
      } else {
        this.facade.create(studentData);
        //this.store.dispatch(NotificationActions.showNotification({ message: this.translate.instant('STUDENT.STUDENT_ADDED_SUCCESS') }));
      }
      this.ref.close(true);

    }
  }

  markFormasAsTouched() {
    this.personalDataForm.markAllAsTouched();
    this.advisorDocForm.markAllAsTouched();
    this.personDocForm.markAllAsTouched();
    this.additionalDocForm.markAllAsTouched();
  }
}



