import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../person/person.model';
import { Store } from '@ngrx/store';
import { addPERSON, updatePERSON } from '../../person/store/person.actions';
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
          fechaNacimiento: this.editdata.fechaNacimiento,
          fechaBautismo: this.editdata.fechaBautismo,
          fechaConfirmacion: this.editdata.fechaConfirmacion,
          fechaMatrimonio: this.editdata.fechaMatrimonio,
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
    dni: this.builder.control(''),
    padre: this.builder.control(''),
    madre: this.builder.control(''),
    fechaNacimiento: this.builder.control(new Date()),
    fechaBautismo: this.builder.control(new Date()),
    fechaConfirmacion: this.builder.control(new Date()),
    fechaMatrimonio: this.builder.control(new Date()),
    apellidoPadrinoBaut: this.builder.control(''),
    nroLibro: this.builder.control(''),
    nroFolio: this.builder.control(''),
    nombrePadrinoBaut: this.builder.control(''),
    apellidoPadrinoConf: this.builder.control(''),
    nombrePadrinoConf: this.builder.control(''),
    apellidoMatrimonio: this.builder.control(''),
    nombreMatrimonio: this.builder.control(''),
    otrasNotas: this.builder.control(''),



  });

  savePerson(){
    if(this.personForm.valid){
      const _obj: Person = {
        id: (this.personForm.value.id ? this.personForm.value.id : 0 ),
        apellido: this.personForm.value.apellido as string,
        apellidoNombre: '',
        nombre: this.personForm.value.nombre as string,
        dni: parseInt(this.personForm.value.dni as string) ,
        padre: this.personForm.value.padre as string,
        madre: this.personForm.value.madre as string,
        fechaNacimiento: (this.personForm.value.fechaNacimiento?this.personForm.value.fechaNacimiento:new Date(0)),
        fechaBautismo: (this.personForm.value.fechaBautismo?this.personForm.value.fechaBautismo: new Date(0)),
        fechaConfirmacion: (this.personForm.value.fechaConfirmacion?this.personForm.value.fechaConfirmacion:new Date(0)),
        fechaMatrimonio: (this.personForm.value.fechaMatrimonio?this.personForm.value.fechaMatrimonio:new Date(0)),
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
      if(this.editcode>0)
        this.store.dispatch(updatePERSON({inputdata: _obj}));
      else
        this.store.dispatch(addPERSON({inputdata:_obj}));
    }else{
      this.store.dispatch(showalert({message:'Por favor, ingrese los datos obligatorios',resulttype:'fail'}));
    }
  }

  closePopup(){
    this.ref.close();
  }

}
