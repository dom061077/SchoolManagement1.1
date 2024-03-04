import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddpersonComponent } from '../addperson/addperson.component';

@Component({
  selector: 'app-personlisting',
  templateUrl: './personlisting.component.html',
  styleUrl: './personlisting.component.css'
})
export class PersonlistingComponent implements OnInit {

  constructor(private dialog: MatDialog) {

  }
  ngOnInit(): void {
    
  }

  addPerson(){
    this.openPopup(0,'Agregar Persona');
  }

  openPopup(code: number, title: string){
    this.dialog.open(AddpersonComponent,{
      //width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    })
  }

}
