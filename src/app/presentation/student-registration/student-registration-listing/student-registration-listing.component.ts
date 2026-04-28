import { Component, effect, OnDestroy, OnInit, Signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StudentRegistrationFacade } from '../../../core/state/student-registration/student-registration.facade';
import { studentRegistrationSelectors } from '../../../core/state/student-registration/student-registration-reducer';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentRegistration } from '../../../core/model/student-registration.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistrationAddEditComponent } from '../student-registration-add-edit/student-registration-add-edit.component';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../../shared/ui.service';
import { QueryFIlterCriterion } from '../../../core/model/query-filter-criterion';

@Component({
  selector: 'app-student-registration-listing',
  templateUrl: './student-registration-listing.component.html',
  styleUrls: ['./student-registration-listing.component.css']
})
export class StudentRegistrationListingComponent implements OnInit, OnDestroy {
  pageSizeOptions: number[] = [5, 10, 20];

  displayedColumns: string[] = ['id', 'studentLastName', 'studentFirstName', 'academicYearYear', 'gradeLevelGradeNumber', 'action'];
  dataSource = new MatTableDataSource<StudentRegistration>();
  data = this.store.selectSignal(studentRegistrationSelectors.selectAll) as Signal<StudentRegistration[]>;
  total = this.store.selectSignal(studentRegistrationSelectors.selectTotalRest) as Signal<number>;
  pageIndex = this.store.selectSignal(studentRegistrationSelectors.selectPageIndex) as Signal<number>;
  pageSize = this.store.selectSignal(studentRegistrationSelectors.selectPageSize) as Signal<number>;

  errormessage: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(public facade: StudentRegistrationFacade, private store: Store, private translate: TranslateService
      , private fb: FormBuilder, private dialog: MatDialog, private uiService: UiService) {
    
    this.filterForm = this.fb.group({
      studentLastName: [''],
      studentFirstName: [''],
      academicYearYear: ['']
    });
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.loadRecords();
  }

  loadRecords() {
    const pageIndex = this.paginator?.pageIndex;
    const pageSize = this.paginator?.pageSize;
    const sortField = this.dataSource.sort?.active;
    const sortDirection = this.dataSource.sort?.direction;
    var sorts = '';
    if (sortField != undefined && sortDirection != undefined && sortDirection !== '') {
      sorts = '[{"property": "' + sortField + '","value":"' + sortDirection + '"}]';
    }
    const qfilter: QueryFIlterCriterion[] = [];
    
    if (this.filterForm.value.studentLastName) {
      qfilter.push({ property: 'studentLastName:like', value: this.filterForm.value.studentLastName });
    }
    if (this.filterForm.value.studentFirstName) {
      qfilter.push({ property: 'studentFirstName:like', value: this.filterForm.value.studentFirstName });
    }
    if (this.filterForm.value.academicYearYear) {
      qfilter.push({ property: 'academicYearYear:eq', value: this.filterForm.value.academicYearYear });
    }

    const offset = (pageIndex ?? 0) * (pageSize ?? 5);
    const limit = pageSize ?? 5;
    this.facade.loadAll(offset, limit, JSON.stringify(qfilter), sorts, 'AND');
  }

  applyFilter() {
    this.paginator?.firstPage();
    this.loadRecords();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  clearFilter() {
    this.filterForm.reset();
    this.loadRecords();
  }

  studentRegistrationDelete(id: number) {
    this.subscriptions.push(this.uiService.confirm(this.translate.instant('STUDENT_REGISTRATION.CONFIRM_DELETE_MESSAGE'), this.translate.instant('STUDENT_REGISTRATION.CONFIRM_DELETE_TITLE'), 'warn')
      .subscribe(confirmed => {
        if (confirmed) {
          this.facade.delete(id);
        }
      }));
  }

  studentRegistrationDetails(id: number) {
    this.openPopup(id, 'STUDENT_REGISTRATION.VIEW_REGISTRATION', true);
  }

  sortData(event: any) {
    this.applyFilter();
  }

  ngAfterViewInit() {
    if (this.sort) {
        this.dataSource.sort = this.sort;
    } else {
        console.error('MatSort is undefined! Check the HTML template and module imports.');
    }
  }

  studentRegistrationEdit(id: number) {
    this.openPopup(id, 'STUDENT_REGISTRATION.EDIT_REGISTRATION');
  }

  addStudentRegistration() {
    this.openPopup(0, 'STUDENT_REGISTRATION.ADD_REGISTRATION');
  }

  openPopup(code: number, title: string, readOnly: boolean = false, toDelete: boolean = false) {
    this.dialog.open(StudentRegistrationAddEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '80vw',
      height: '80vh',
      data: {
        code: code,
        readOnly: readOnly,
        title: title,
        toDelete: toDelete
      }
    });
  }

  onPageChange($event: PageEvent) {
    this.loadRecords();
  }
}
