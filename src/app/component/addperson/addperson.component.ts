import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrl: './addperson.component.css'
})
export class AddpersonComponent implements OnInit{
  title = 'Agregar Persona';
  isedit = false;
  dialogdata : any;

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddpersonComponent>
    ,@Inject(MAT_DIALOG_DATA) public data:any){

  }

  ngOnInit(): void {
    this.dialogdata=this.data;
    this.title=this.dialogdata.title;
  }



  personForm = this.builder.group({
    id: this.builder.control(0),
    apellido: this.builder.control('',Validators.required),
    nombre: this.builder.control('',Validators.required),
    dni: this.builder.control('',Validators.required),
    padre: this.builder.control('',Validators.required),
    madre: this.builder.control('',Validators.required),
    fechaNacimiento: this.builder.control('',Validators.required),
    fechaBautismo: this.builder.control('',Validators.required),
    fechaConfirmacion: this.builder.control('',Validators.required),
    fechaMatrimonio: this.builder.control('',Validators.required),
    apellidoPadrinoBaut: this.builder.control('',Validators.required),
    nroLibro: this.builder.control('',Validators.required),
    nroFolio: this.builder.control('',Validators.required),
    nombrePadrinoBaut: this.builder.control('',Validators.required),
    apellidoPadrinoConf: this.builder.control('',Validators.required),
    nombrePadrinoConf: this.builder.control('',Validators.required),
    apellidoMatrimonio: this.builder.control('',Validators.required),
    nombreMatrimonio: this.builder.control('',Validators.required),
    otrasNotas: this.builder.control(''),



  });

  savePerson(){
    if(this.personForm.valid){

    }
  }

  closePopup(){
    this.ref.close();
  }

}
