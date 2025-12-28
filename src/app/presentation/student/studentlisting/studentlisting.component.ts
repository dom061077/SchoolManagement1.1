import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StudentFacade } from '../../../core/state/student/student.facade';
import { studentSelectors } from '../../../core/state/student/student-reducer';
import * as NotificationActions from '../../../core/state/notification/notification.actions';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../../core/model/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentaddeditComponent } from '../studentaddedit/studentaddedit.component';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../../shared/ui.service';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-studentlisting',
  templateUrl: './studentlisting.component.html',
  styleUrls: ['./studentlisting.component.css']
})
export class StudentlistingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'dni', 'action'];
  dataSource = new MatTableDataSource<Student>();
  data$: Observable<Student[]>;
  errormessage : string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;  
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(public facade: StudentFacade, private store: Store, private translate: TranslateService
      , private fb: FormBuilder, private dialog: MatDialog, private uiService: UiService) {
    
    this.filterForm = this.fb.group({
      lastName: [''],
      firstName: [''],
      dni: ['']
    });
    this.data$ = this.store.select(studentSelectors.selectAll) as Observable<Student []>;
  }

  ngOnInit(): void {
    this.loadStudents();
    this.dataSource.sort = this.sort;
    this.subscriptions.push(
      this.data$.subscribe((students: any) => {
        this.dataSource.data = students;
        
      }));



  }

  applyFilter(){
      this.paginator?.firstPage();
    const pageIndex = this.paginator?.pageIndex;
    const pageSize = this.paginator?.pageSize;
    const sortField = this.dataSource.sort?.active;
    const sortDirection = this.dataSource.sort?.direction;   
    var sorts = '';
    if(sortField != undefined && sortDirection!= undefined)
      sorts = '[{"property": "'+sortField+'","value":"'+sortDirection+'"}]'; 
    const qfilter = '[{ "property":"lastName:like", "value": "'+ this.filterForm.value.lastName+'"},{"property":"firstName:like", "value" : "'
      +this.filterForm.value.firstName+'"},{"property":"dni:eq","value": '+this.filterForm.value?.dni+'}]';
    //this.store.dispatch(loadStudents({offset:pageIndex*pageSize, limit: pageSize, qfilter: qfilter?.toString(),sorts}));
    const offset = (pageIndex ?? 0) * (pageSize ?? 5);
    const limit = pageSize ?? 5;
    this.facade.loadAll(offset, limit, qfilter?.toString(), sorts);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadStudents() {
    //this.store.dispatch(loadStudents());
    this.facade.loadAll(0, 5, "a", "a");
  }

  clearFilter() {
    this.filterForm.reset();
    this.loadStudents();
  }

  
  studentDelete(id: number) {
    // Open delete confirmation dialog
   this.subscriptions.push(this.uiService.confirm(this.translate.instant('STUDENT.CONFIRM_DELETE_MESSAGE'), this.translate.instant('STUDENT.CONFIRM_DELETE_TITLE'), 'warn')
      .subscribe(confirmed => {
        if (confirmed) {
          // Proceed with deletion
          this.facade.delete(id);
        }
      }));
  }

  studentDetails(id: number) {
    // Open details view
    this.openPopup(id,'STUDENT.VIEW_STUDENT', true);
  }

  sortData(event: any) {this.applyFilter();
  }

  ngAfterViewInit() {
    if (this.sort) { // 👈 Check if it exists before assigning
        this.dataSource.sort = this.sort;
    } else {
        console.error('MatSort is undefined! Check the HTML template and module imports.');
    }
  }

  studentEdit(id: number) {
    this.openPopup(id,'STUDENT.EDIT_STUDENT');
  }


  addStudent(){
    this.openPopup(0, 'STUDENT.ADD_STUDENT');
  }


  openPopup(code: number, title: string, readOnly: boolean = false, toDelete: boolean = false) {
    this.dialog.open(StudentaddeditComponent,{
      //disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '80vw', // 80% of the viewport width
      height: '80vh',      
      data: {
        code: code,
        readOnly: readOnly,
        title: title,
        toDelete: toDelete
      }      
    });
    
  }

}
