import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-studentlisting',
  templateUrl: './studentlisting.component.html',
  styleUrl: './studentlisting.component.css'
})
export class StudentlistingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'age', 'grade', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      age: [''],
      grade: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.subscriptions.push(
      this.store.select(selectStudents).subscribe((students) => {
        this.dataSource.data = students;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadStudents() {
    this.store.dispatch(loadStudents());
  }

  applyFilter() {
    const filterValue = this.filterForm.value;
    this.store.dispatch(filterStudents({ filterValue }));
  }

  clearFilter() {
    this.filterForm.reset();
    this.loadStudents();
  }

}
