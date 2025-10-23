import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityState } from '@ngrx/entity';

@Injectable()
export class FacadeBase<T> {
  items$: Observable<T[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private store: Store<{ feature: EntityState<T> }>,
    private actions: {
      loadAll: () => any;
      create: (payload: { item: T }) => any;
      update: (payload: { item: T }) => any;
      delete: (payload: { id: string | number }) => any;
    },
    private selectors: {
      selectAll: (state: any) => T[];
      selectLoading: (state: any) => boolean;
      selectError: (state: any) => any;
    }
  ) {
    this.items$ = this.store.select(this.selectors.selectAll);
    this.loading$ = this.store.select(this.selectors.selectLoading);
    this.error$ = this.store.select(this.selectors.selectError);
  }

  loadAll(): void {
    this.store.dispatch(this.actions.loadAll());
  }

  create(item: T): void {
    this.store.dispatch(this.actions.create({ item }));
  }

  update(item: T): void {
    this.store.dispatch(this.actions.update({ item }));
  }

  delete(id: string | number): void {
    this.store.dispatch(this.actions.delete({ id }));
  }
}
