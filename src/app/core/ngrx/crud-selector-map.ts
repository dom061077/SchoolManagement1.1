import { MemoizedSelector } from '@ngrx/store';
import { CrudState } from './reducer-factory';
import { Dictionary } from '@ngrx/entity';

// This type represents the "Bundle" returned by your factory
export interface CrudSelectorMap<T> {
  selectFeature: MemoizedSelector<any, CrudState<T>>;
  selectAll: MemoizedSelector<any, T[]>;
  selectEntities: MemoizedSelector<any, { [id: string]: T | undefined }>;
  selectIds: MemoizedSelector<any, string[] | number[]>;
  selectTotalRest: MemoizedSelector<any, number>;
  selectLoading: MemoizedSelector<any, boolean>;
  selectError: MemoizedSelector<any, any>;
  selectPageIndex: MemoizedSelector<any, number>;
  selectPageSize: MemoizedSelector<any, number>;
}