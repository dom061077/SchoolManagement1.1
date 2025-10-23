import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../../../core/model/student.model';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-studentaddedit',
  templateUrl: './studentaddedit.component.html',
  styleUrl: './studentaddedit.component.css'
})
export class StudentaddeditComponent implements OnInit {
  title = 'Agregar Persona';
  isedit = false;
  dialogdata : any;
  editcode!: number;
  editdata!: Student;  

   constructor(private builder: FormBuilder, private ref: MatDialogRef<StudentaddeditComponent>
     ,@Inject(MAT_DIALOG_DATA) public data:any, private store: Store){
 
   }  

  ngOnInit(): void {

  }
    studentForm = this.builder.group({
      id: [''],
      apellido: [''],
      nombre: [''],
      dni: [''],
      padre: [''],  
      madre: [''],
      fechaNacimiento: [''],
      fechaBautismo: [''],
      fechaConfirmacion: [''],
      fechaMatrimonio: [''],
      apellidoPadrinoBaut: [''],
      nroLibro: [''],
      nroFolio: ['']
    });

    saveStudent(){

    }

}
