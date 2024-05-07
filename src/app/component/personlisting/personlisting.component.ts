import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddpersonComponent } from '../addperson/addperson.component';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Person } from '../../person/person.model';
import { loadPERSON, loadPERSONtotalrows } from '../../person/store/person.actions';
import { getErrormessage, getTotalRows, getpersonlist } from '../../person/store/person.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { config } from '../../service/config';
import { Observable } from 'rxjs';
import { getLoading, getPdfReportBlob, getPdfReportError } from '../../common/store/pdfreport.selectors';
import { pdfREPORTgenerate, pdfREPORTsuccess } from '../../common/store/pdfreport.actions';

@Component({
  selector: 'app-personlisting',
  templateUrl: './personlisting.component.html',
  styleUrl: './personlisting.component.css'
})
export class PersonlistingComponent implements OnInit {
  personList!: Person[];
  datasource: any;
  errormessage='';
  totalRows: number = 50;
  loading$: Observable<boolean> | undefined;
  pdfReportError$: Observable<string | null> | undefined;
  pdfReportUrl$: Observable<string | null> | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["id","dni","apellido","nombre", "action"]
  constructor(private dialog: MatDialog, private store: Store, private builder: FormBuilder
    ) {

  }

  filterForm = this.builder.group({
    apellido : "",
    nombre : "",
    dni : null,
  });

  ngOnInit(): void {
    this.store.select(getPdfReportBlob).subscribe(res=>{
      if(!res)
        return;
      const resBlob : Blob = (res ? res : new Blob());
      const a = document.createElement('a');
      const blobUrl = URL.createObjectURL(resBlob);
      a.href = blobUrl;
      a.download = 'report.pdf';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      //window.open(window.URL.createObjectURL(resBlob),'blank');
      //console.log('El blob resultante es: ',res);
    })

    this.store.dispatch(loadPERSON({offset: 0, limit: 5, qfilter: "", sorts: ""}));
    this.store.select(getErrormessage).subscribe(res=>{
      this.errormessage=res;
    })
    this.store.select(getpersonlist).subscribe(item => {
      this.personList = item;
      this.datasource = new MatTableDataSource<Person>(this.personList);
      
      //this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
        
    
    });  
    this.store.select(getTotalRows).subscribe(tot => {
      this.totalRows=tot;
    
    }); 
  }

  addPerson(){
    this.openPopup(0,'Agregar Persona');
  }

  personEdit(id: number){ 
    const url = config.apiUrl+'/api/v1/person/'
    this.openPopup(id,"Modificación")
  }

  personPrintCert(personId: number){
    this.store.dispatch(pdfREPORTgenerate({id:personId}));
  }

  personDelete(id: number){
    window.open();
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
    });
  }

  applyFilter(){
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const sortField = this.datasource.sort?.active;
    const sortDirection = this.datasource.sort?.direction;   
    var sorts = '';
    if(sortField != undefined && sortDirection!= undefined)
      sorts = '[{"property": "'+sortField+'","value":"'+sortDirection+'"}]'; 
    const qfilter = '[{ "property":"apellido:like", "value": "'+ this.filterForm.value.apellido+'"},{"property":"nombre:like", "value" : "'
      +this.filterForm.value.nombre+'"},{"property":"dni:eq","value": '+this.filterForm.value?.dni+'}]';
    this.store.dispatch(loadPERSON({offset:pageIndex*pageSize, limit: pageSize, qfilter: qfilter?.toString(),sorts}));
  }
  
  sortData(event: any){
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;    
    const sortField = this.datasource.sort?.active;
    const sortDirection = this.datasource.sort?.direction; 
    var sorts = '';
    if(sortField != undefined && sortDirection!= undefined)
      sorts = '[{"property": "'+sortField+'","value":"'+sortDirection+'"}]'; 
    const qfilter = '[{ "property":"apellido:like", "value": "'+ this.filterForm.value.apellido+'"}]';
    this.store.dispatch(loadPERSON({offset:pageIndex*pageSize, limit: pageSize, qfilter: qfilter?.toString(),sorts}));
  }  

  nextPageEvent(event:any){
    console.log('Next page event: ', event);
    const pageIndex = event.pageIndex;
    const pageSize = this.paginator.pageSize;    
    const sortField = this.datasource.sort?.active;
    const sortDirection = this.datasource.sort?.direction; 
    var sorts = '';
    if(sortField != undefined && sortDirection!= undefined)
      sorts = '[{"property": "'+sortField+'","value":"'+sortDirection+'"}]'; 

    const qfilter = '[{ "property":"apellido:like", "value": "'+ this.filterForm.value.apellido+'"}]';
    this.store.dispatch(loadPERSON({offset:pageIndex*pageSize, limit: pageSize, qfilter: qfilter?.toString(),sorts}));    
  }

}



/*
 
 
 import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'email'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadPage();
  }

  loadPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const sortField = this.dataSource.sort?.active;
    const sortDirection = this.dataSource.sort?.direction;

    this.dataService.getData(pageIndex, pageSize, sortField, sortDirection)
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  sortData(event: any) {
    // Reset paginator to first page when sorting is applied
    this.paginator.firstPage();
    this.loadPage();
  }
}
 
  
 
 */