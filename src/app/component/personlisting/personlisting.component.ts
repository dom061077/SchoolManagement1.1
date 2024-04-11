import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddpersonComponent } from '../addperson/addperson.component';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Person } from '../../person/person.model';
import { loadPERSON } from '../../person/store/person.actions';
import { getErrormessage, getpersonlist } from '../../person/store/person.selectors';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-personlisting',
  templateUrl: './personlisting.component.html',
  styleUrl: './personlisting.component.css'
})
export class PersonlistingComponent implements OnInit {
  personList!: Person[];
  datasource: any;
  errormessage='';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["id","apellido"]
  constructor(private dialog: MatDialog, private store: Store) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadPERSON());
    this.store.select(getErrormessage).subscribe(res=>{
      this.errormessage=res;
    })
    this.store.select(getpersonlist).subscribe(item => {
      this.personList = item;
      this.datasource = new MatTableDataSource<Person>(this.personList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });  
  }

  addPerson(){
    this.openPopup(0,'Agregar Persona');
  }

  personEdit(id: number){

  }

  personDelete(id: number){

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
