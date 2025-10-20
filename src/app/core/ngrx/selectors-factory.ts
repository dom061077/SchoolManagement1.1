import { createFeatureSelector, createSelector } from '@ngrx/store';

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

  return { selectFeature, selectAll, selectEntities, selectIds, selectTotal, selectLoading, selectError };
}
