import { Component, effect, OnDestroy, OnInit, Signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SchoolExamFacade } from '../../../core/state/school-exam/school-exam.facade';
import { schoolExamSelectors } from '../../../core/state/school-exam/school-exam-reducer';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolExam } from '../../../core/model/school-exam.model';
import { MatDialog } from '@angular/material/dialog';
import { SchoolExamAddEditComponent } from '../school-exam-add-edit/school-exam-add-edit.component';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../../shared/ui.service';
import { QueryFIlterCriterion } from '../../../core/model/query-filter-criterion';

@Component({
  selector: 'app-school-exam-listing',
  templateUrl: './school-exam-listing.component.html',
  styleUrls: ['./school-exam-listing.component.css']
})
export class SchoolExamListingComponent implements OnInit, OnDestroy {
  pageSizeOptions: number[] = [5, 10, 20];

  displayedColumns: string[] = ['id', 'name', 'description', 'date', 'tipoExamenName', 'subjectName', 'action'];
  dataSource = new MatTableDataSource<SchoolExam>();
  data = this.store.selectSignal(schoolExamSelectors.selectAll) as Signal<SchoolExam[]>;
  total = this.store.selectSignal(schoolExamSelectors.selectTotalRest) as Signal<number>;
  pageIndex = this.store.selectSignal(schoolExamSelectors.selectPageIndex) as Signal<number>;
  pageSize = this.store.selectSignal(schoolExamSelectors.selectPageSize) as Signal<number>;

  errormessage: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    public facade: SchoolExamFacade,
    private store: Store,
    private translate: TranslateService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uiService: UiService
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      subjectName: [''],
      date: ['']
    });

    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords() {
    const pageIndex = this.paginator?.pageIndex;
    const pageSize = this.paginator?.pageSize;
    const sortField = this.sort?.active;
    const sortDirection = this.sort?.direction;
    let sorts = '';
    if (sortField !== undefined && sortDirection !== undefined && sortDirection !== '') {
      sorts = '[{"property": "' + sortField + '","value":"' + sortDirection + '"}]';
    }
    const qfilter: QueryFIlterCriterion[] = [];

    if (this.filterForm.value.name) {
      qfilter.push({ property: 'name:like', value: this.filterForm.value.name });
    }
    if (this.filterForm.value.subjectName) {
      qfilter.push({ property: 'subjectName:like', value: this.filterForm.value.subjectName });
    }
    if (this.filterForm.value.date) {
      // Date formatting for API
      const dateVal = new Date(this.filterForm.value.date);
      const year = dateVal.getFullYear();
      const month = String(dateVal.getMonth() + 1).padStart(2, '0');
      const day = String(dateVal.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      qfilter.push({ property: 'date:eq', value: formattedDate });
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

  schoolExamDelete(id: number) {
    this.subscriptions.push(
      this.uiService.confirm(
        this.translate.instant('SCHOOL_EXAM.CONFIRM_DELETE_MESSAGE'),
        this.translate.instant('SCHOOL_EXAM.CONFIRM_DELETE_TITLE'),
        'warn'
      ).subscribe(confirmed => {
        if (confirmed) {
          this.facade.delete(id);
        }
      })
    );
  }

  schoolExamDetails(id: number) {
    this.openPopup(id, 'SCHOOL_EXAM.VIEW_DETAILS', true);
  }

  sortData(event: any) {
    this.applyFilter();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  schoolExamEdit(id: number) {
    this.openPopup(id, 'SCHOOL_EXAM.EDIT_EXAM');
  }

  addSchoolExam() {
    this.openPopup(0, 'SCHOOL_EXAM.ADD_EXAM');
  }

  openPopup(code: number, title: string, readOnly: boolean = false, toDelete: boolean = false) {
    this.dialog.open(SchoolExamAddEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '85vw',
      height: '85vh',
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
