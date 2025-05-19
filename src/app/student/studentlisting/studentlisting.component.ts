import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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
  dataSource : any;
  errormessage : string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      age: [''],
      grade: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    /*this.subscriptions.push(
      this.store.select(selectStudents).subscribe((students) => {
        this.dataSource.data = students;
      })
    );*/
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadStudents() {
    //this.store.dispatch(loadStudents());
  }

  applyFilter() {
    const filterValue = this.filterForm.value;
    //this.store.dispatch(filterStudents({ filterValue }));
  }

  clearFilter() {
    this.filterForm.reset();
    this.loadStudents();
  }

  studentEdit(id: number) {
    // Open edit dialog
  }
  
  studentDelete(id: number) {
    // Open delete confirmation dialog
  }

  sortData(event: any) {
    const sortField = event.active;
    const sortDirection = event.direction;
    //this.store.dispatch(sortStudents({ sortField, sortDirection }));
  }
}
