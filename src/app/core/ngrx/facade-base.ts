import { Signal } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { CrudSelectorMap } from './crud-selector-map';

export class FacadeBase<T> {
  items: Signal<T[]>;
  loading: Signal<boolean>;
  error: Signal<any>;
  totalRest: Signal<number>;

  constructor(
    // Use 'any' or a global state interface for the Store root
    protected store: Store<any>,

    private actions: {
      loadAll: (payload: { pageIndex: number; pageSize: number; qfilter: string; sorts: string; loperator: string }) => any;
      loadAllSuccess: (payload: { items: T[]; total: number }) => any;
      loadAllFailure: (payload: { error: any }) => any;
      loadInstance: (payload: { id: string | number }) => any;
      loadInstanceSuccess: (payload: { obj: T }) => any;
      loadInstanceFailure: (payload: { error: any }) => any;
      create: (payload: { item: T }) => any;
      createSuccess: (payload: { item: T }) => any;
      createFailure: (payload: { error: any }) => any;
      update: (payload: { item: T }) => any;
      updateSuccess: (payload: { item: T }) => any;
      updateFailure: (payload: { error: any }) => any;
      delete: (payload: { id: string | number }) => any;
      deleteSuccess: (payload: { id: string | number }) => any;
      deleteFailure: (payload: { error: any }) => any; // Allows for flexibility with generated actions
    },

    private selectors: CrudSelectorMap<T>
  ) {
    this.items = this.store.selectSignal(this.selectors.selectAll);
    this.loading = this.store.selectSignal(this.selectors.selectLoading);
    this.error = this.store.selectSignal(this.selectors.selectError);
    this.totalRest = this.store.selectSignal(this.selectors.selectTotalRest);
  }
  loadAll(pageIndex: number, pageSize: number, qfilter: string, sorts: string, loperator: string): void {
    this.store.dispatch(this.actions.loadAll({ pageIndex, pageSize, qfilter, sorts, loperator }));
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

  loadInstance(id: string | number): void {
    this.store.dispatch(this.actions.loadInstance({ id }));
  }

}