import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../../../core/model/student.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EstudioEnum } from '../../../core/model/estudioenum.model';
import { Observable } from 'rxjs/internal/Observable';
import { estudioenumSelectors } from '../../../core/state/estudioenum/estudioenum.reducer';
import { StudentFacade } from '../../../core/state/student/student.facade';
import { EstudioEnumFacade } from '../../../core/state/estudioenum/estudioenum.facade';

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
      estudioTerUnivTutor: [''],
      dniTutor: [''],
      cuilTutor: [''],
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
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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


    advisorForm = this.builder.group({
      
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
    this.estudioEnumError$.subscribe((error) => {
      console.log('Error loading EstudioEnum data:', error);
    });
    this.estudioEnumFacade.loadAll(0,100,'','');
  }

  onSubmit() {
   throw new Error('Method not implemented.');
  }

}
