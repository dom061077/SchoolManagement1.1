import { Component, effect, OnDestroy, OnInit, Signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShiftFacade } from '../../../core/state/shift/shift.facade';
import { shiftSelectors } from '../../../core/state/shift/shift.reducer';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from '../../../core/model/shift.model';
import { MatDialog } from '@angular/material/dialog';
import { ShiftaddeditComponent } from '../shiftaddedit/shiftaddedit.component';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../../shared/ui.service';
import { QueryFIlterCriterion } from '../../../core/model/query-filter-criterion';

@Component({
  selector: 'app-shiftlisting',
  templateUrl: './shiftlisting.component.html',
  styleUrls: ['./shiftlisting.component.css']
})
export class ShiftlistingComponent implements OnInit, OnDestroy {
  pageSizeOptions: number[] = [5, 10, 20];

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Shift>();
  data = this.store.selectSignal(shiftSelectors.selectAll) as Signal<Shift[]>;
  total = this.store.selectSignal(shiftSelectors.selectTotalRest) as Signal<number>;
  pageIndex = this.store.selectSignal(shiftSelectors.selectPageIndex) as Signal<number>;
  pageSize = this.store.selectSignal(shiftSelectors.selectPageSize) as Signal<number>;

  errormessage: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(public facade: ShiftFacade, private store: Store, private translate: TranslateService
      , private fb: FormBuilder, private dialog: MatDialog, private uiService: UiService) {
    
    this.filterForm = this.fb.group({
      name: ['']
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
    
    if (this.filterForm.value.name) {
      qfilter.push({ property: 'name:like', value: this.filterForm.value.name });
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

  shiftDelete(id: number) {
    this.subscriptions.push(this.uiService.confirm(this.translate.instant('SHIFT.CONFIRM_DELETE_MESSAGE'), this.translate.instant('SHIFT.CONFIRM_DELETE_TITLE'), 'warn')
      .subscribe(confirmed => {
        if (confirmed) {
          this.facade.delete(id);
        }
      }));
  }

  shiftDetails(id: number) {
    this.openPopup(id, 'SHIFT.VIEW_SHIFT', true);
  }

  sortData(event: any) {
    this.applyFilter();
  }

  ngAfterViewInit() {
    if (this.sort) {
        this.dataSource.sort = this.sort;
    }
  }

  shiftEdit(id: number) {
    this.openPopup(id, 'SHIFT.EDIT_SHIFT');
  }

  addShift() {
    this.openPopup(0, 'SHIFT.ADD_SHIFT');
  }

  openPopup(code: number, title: string, readOnly: boolean = false, toDelete: boolean = false) {
    this.dialog.open(ShiftaddeditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '40vw',
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
