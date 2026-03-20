import { EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { CrudState } from './reducer-factory';
import { CrudSelectorMap } from './crud-selector-map';

export function createEntitySelectors<T>(
  featureKey: string,
  adapter: EntityAdapter<T>
): CrudSelectorMap<T> {
  const selectFeature = createFeatureSelector<CrudState<T>>(featureKey);

  const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  } = adapter.getSelectors(selectFeature);

  const selectLoading = createSelector(selectFeature, state => state.loading);
  const selectError = createSelector(selectFeature, state => state.error);
  const selectPageIndex = createSelector(selectFeature, state => state.pageIndex ?? 0);
  const selectPageSize = createSelector(selectFeature, state => state.pageSize ?? 10);
  const selectTotalRest = createSelector(selectFeature, state => state.total ?? 0);

  return { selectFeature, selectAll, selectEntities, selectIds, selectTotalRest, selectLoading
    , selectError, selectPageIndex, selectPageSize };
}
