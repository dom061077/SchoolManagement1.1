import { Injectable, inject, Signal } from '@angular/core';
import { Student } from '../../model/student.model';
import { StudentStore } from './student.store';

@Injectable({ providedIn: 'root' })
export class StudentFacade {
  readonly store = inject(StudentStore);

  readonly items: Signal<Student[]> = this.store.entities;
  readonly selectEntities: Signal<{ [id: string | number]: Student }> = this.store.entityMap;
  readonly loading: Signal<boolean> = this.store.loading;
  readonly error: Signal<any> = this.store.error;
  readonly totalRest: Signal<number> = this.store.total;
  readonly pageIndex: Signal<number> = this.store.pageIndex;
  readonly pageSize: Signal<number> = this.store.pageSize;

  loadAll(pageIndex: number, pageSize: number, qfilter: string, sorts: string, loperator: string): void {
    this.store.loadAll({ pageIndex, pageSize, qfilter, sorts, loperator });
  }

  create(item: Student): void {
    this.store.create({ item });
  }

  update(item: Student): void {
    this.store.update({ item });
  }

  delete(id: string | number): void {
    this.store.delete({ id });
  }

  loadInstance(id: string | number): void {
    this.store.loadInstance({ id });
  }

  searchStudents(term: string, pageSize: number): void {
    this.store.searchStudentsByTerm(term, pageSize);
  }
}