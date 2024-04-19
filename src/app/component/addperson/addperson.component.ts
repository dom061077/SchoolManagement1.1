import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../person/person.model';
import { Store } from '@ngrx/store';
import { addPERSON } from '../../person/store/person.actions';
import { showalert } from '../../common/store/app.action';
import { getperson } from '../../person/store/person.selectors';

@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrl: './addperson.component.css'
})
export class AddpersonComponent implements OnInit{
  title = 'Agregar Persona';
  isedit = false;
  dialogdata : any;
  editcode!: number;
  editdata!: Person;


  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddpersonComponent>
    ,@Inject(MAT_DIALOG_DATA) public data:any, private store: Store){

  }

  ngOnInit(): void {
    this.dialogdata=this.data;
    this.title=this.dialogdata.title;

    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.editcode = this.dialogdata.code;
    //if (this.editcode > 0) {
      
      this.store.select(getperson(this.editcode)).subscribe(res => {
        this.editdata = res as Person;
        this.personForm.setValue({
          id: this.editdata.id,
          apellido: this.editdata.apellido,
          nombre: this.editdata.nombre,
          dni: this.editdata.dni.toString(),
          padre: this.editdata.padre.toString(),
          madre: this.editdata.madre.toString(),
          fechaNacimiento: this.editdata.fechaNacimiento.toString(),
          fechaBautismo: this.editdata.fechaBautismo.toString(),
          fechaConfirmacion: this.editdata.fechaConfirmacion.toString(),
          fechaMatrimonio: this.editdata.fechaMatrimonio.toString(),
          apellidoPadrinoBaut: this.editdata.apellidoPadrinoBaut,
          nroLibro: this.editdata.nroLibro.toString(),
          nroFolio: this.editdata.nroFolio.toString(),
          nombrePadrinoBaut: this.editdata.nombrePadrinoBaut.toString(),
          apellidoPadrinoConf: this.editdata.apellidoPadrinoConf.toString(),
          nombrePadrinoConf: this.editdata.nombrePadrinoConf.toString(),
          apellidoMatrimonio: this.editdata.apellidoMatrimonio.toString(),
          nombreMatrimonio: this.editdata.nombreMatrimonio.toString(),
          otrasNotas: this.editdata.otrasNotas.toString(),
      

        })
      })
    //}    
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
      const _obj: Person = {
        id: 0,
        apellido: this.personForm.value.apellido as string,
        apellidoNombre: '',
        nombre: this.personForm.value.nombre as string,
        dni: parseInt(this.personForm.value.dni as string) ,
        padre: this.personForm.value.padre as string,
        madre: this.personForm.value.madre as string,
        fechaNacimiento: new Date(this.personForm.value.fechaNacimiento as string),
        fechaBautismo: new Date(this.personForm.value.fechaBautismo as string),
        fechaConfirmacion: new Date(this.personForm.value.fechaConfirmacion as string),
        fechaMatrimonio: new Date(this.personForm.value.fechaMatrimonio as string),
        nroLibro: parseInt(this.personForm.value.nroLibro as string),
        nroFolio: parseInt(this.personForm.value.nroFolio as string),
        apellidoPadrinoBaut: this.personForm.value.apellidoPadrinoBaut as string,
        nombrePadrinoBaut: this.personForm.value.nombrePadrinoBaut as string,
        apellidoPadrinoConf: this.personForm.value.apellidoPadrinoConf as string,
        nombrePadrinoConf: this.personForm.value.nombrePadrinoConf as string,
        apellidoMatrimonio: this.personForm.value.apellidoMatrimonio as string,
        nombreMatrimonio: this.personForm.value.nombreMatrimonio as string,
        otrasNotas: this.personForm.value.otrasNotas as string        
      }
      this.store.dispatch(addPERSON({inputdata:_obj}));
    }else{
      this.store.dispatch(showalert({message:'Por favor, ingrese los datos obligatorios',resulttype:'fail'}));
    }
  }

  closePopup(){
    this.ref.close();
  }

}
