import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../../../core/model/student.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

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

    personalDataForm = this.builder.group({

      id: [''],
      lastName: ['',Validators.required],
      firstName: ['', Validators.required],
      birthDate: ['', Validators.required],
      dni: ['', Validators.required],
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



   constructor(private builder: FormBuilder, private translate: TranslateService, private ref: MatDialogRef<StudentaddeditComponent>
     ,@Inject(MAT_DIALOG_DATA) public data:any, private store: Store){
      this.title = this.translate.instant(this.title);
      
   }  

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.translate.instant(this.dialogdata.title);
    this.editcode = this.dialogdata.editcode;
  }

    saveStudent(){

    }

}
