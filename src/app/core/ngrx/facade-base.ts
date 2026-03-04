import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityState } from '@ngrx/entity';


export class FacadeBase<T> {
  items: Signal<T[]>;
  loading: Signal<boolean>;
  error: Signal<any>;

  constructor(
    private store: Store<{ feature: EntityState<T> }>,
    /**
     * The actions parameter is the dependency injection point for the CRUD-related actions created by your createCrudActions factory.
     */
    private actions: {
      loadAll: (payload: { pageIndex: number; pageSize: number; qfilter: string; sorts: string; loperator:string}) => any;
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
      deleteFailure: (payload: { error: any }) => any;
    

    },

    /*
selectFeature, selectAll, selectEntities, selectIds, selectTotalRest, selectLoading
    , selectError, selectPageIndex, selectPageSize    
    */
    private selectors: {
      selectFeature: (state: any) => any;
      selectAll: (state: any) => T[];
      selectEntities: (state: any) => { [id: string]: T };
      selectIds: (state: any) => string[] | number[];
      selectTotalRest: (state: any) => number;
      selectLoading: (state: any) => boolean;
      selectError: (state: any) => any;
      selectPageIndex: (state: any) => number;
      selectPageSize: (state: any) => number;
    }
  ) {
    this.items = this.store.selectSignal(this.selectors.selectAll);
    this.loading = this.store.selectSignal(this.selectors.selectLoading);
    this.error = this.store.selectSignal(this.selectors.selectError);
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
}
