import { createFeatureSelector, createSelector, select } from '@ngrx/store';

export function createEntitySelectors<T>(
  featureKey: string,
  adapter: any
) {
  const selectFeature = createFeatureSelector<any>(featureKey);

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
