import { inject, ProviderToken } from '@angular/core';
import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';
import { withEntities, setAllEntities, addEntity, updateEntity, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, mergeMap, tap, catchError, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as NotificationActions from '../state/notification/notification.actions';
import { IPersistencePort } from '../ports/persistence-port';

export interface CrudStoreState {
  loading: boolean;
  error: any;
  pageIndex: number;
  pageSize: number;
  total: number;
}

export function withCrudStore<T extends { id: string | number }>(
  serviceToken: ProviderToken<IPersistencePort<T>>
) {
  return signalStoreFeature(
    withEntities<T>(),
    withState<CrudStoreState>({
      loading: false,
      error: null,
      pageIndex: 0,
      pageSize: 10,
      total: 0,
    }),
    withMethods(
      (
        store,
        service = inject(serviceToken),
        translate = inject(TranslateService),
        ngrxStore = inject(Store, { optional: true })
      ) => {
        const showNotification = (message: string, kind: 'success' | 'error') => {
          if (ngrxStore) {
            ngrxStore.dispatch(NotificationActions.showNotification({ message, kind }));
          }
        };

        const loadAll = rxMethod<{
          pageIndex: number;
          pageSize: number;
          qfilter?: string;
          sorts?: string;
          loperator?: string;
        }>(
          pipe(
            tap(({ pageIndex, pageSize }) =>
              patchState(store, { loading: true, pageIndex, pageSize })
            ),
            switchMap(({ pageIndex, pageSize, qfilter = '', sorts = '', loperator = '' }) =>
              service.list(pageIndex, pageSize, qfilter, sorts, loperator).pipe(
                tap((response) => {
                  patchState(store, {
                    loading: false,
                    total: response.totalElements,
                    error: null,
                  });
                  patchState(store, setAllEntities(response.content));
                }),
                catchError((error) => {
                  patchState(store, { loading: false, error: error?.error || error });
                  return of(null);
                })
              )
            )
          )
        );

        const loadInstance = rxMethod<{ id: string | number }>(
          pipe(
            tap(() => patchState(store, { loading: true })),
            switchMap(({ id }) =>
              service.getById(id as any).pipe(
                tap((instance) => {
                  patchState(store, { loading: false });
                  if (instance) {
                    patchState(store, updateEntity({ id: instance.id.toString(), changes: instance }));
                  }
                }),
                catchError((error) => {
                  patchState(store, { loading: false, error: error?.error || error });
                  return of(null);
                })
              )
            )
          )
        );

        const create = rxMethod<{ item: T }>(
          pipe(
            tap(() => patchState(store, { loading: true })),
            mergeMap(({ item }) =>
              service.create(item).pipe(
                tap((created) => {
                  patchState(store, { loading: false });
                  patchState(store, addEntity(created));
                  showNotification(translate.instant('NOTIFICATION.CREATED_SUCCESS'), 'success');
                  loadAll({ pageIndex: 0, pageSize: 10, qfilter: '', sorts: '' });
                }),
                catchError((error) => {
                  patchState(store, { loading: false, error: error?.error || error });
                  return of(null);
                })
              )
            )
          )
        );

        const update = rxMethod<{ item: T }>(
          pipe(
            tap(() => patchState(store, { loading: true })),
            mergeMap(({ item }) =>
              service.update(item.id as any, item).pipe(
                tap((updated) => {
                  patchState(store, { loading: false });
                  patchState(store, updateEntity({ id: updated.id.toString(), changes: updated }));
                  showNotification(translate.instant('NOTIFICATION.UPDATED_SUCCESS'), 'success');
                  loadAll({ pageIndex: 0, pageSize: 10, qfilter: '', sorts: '' });
                }),
                catchError((error) => {
                  patchState(store, { loading: false, error: error?.error || error });
                  showNotification(translate.instant('NOTIFICATION.UPDATE_ERROR'), 'error');
                  return of(null);
                })
              )
            )
          )
        );

        const remove = rxMethod<{ id: string | number }>(
          pipe(
            tap(() => patchState(store, { loading: true })),
            mergeMap(({ id }) =>
              service.delete(id as any).pipe(
                tap(() => {
                  patchState(store, { loading: false });
                  patchState(store, removeEntity(id.toString()));
                }),
                catchError((error) => {
                  patchState(store, { loading: false, error: error?.error || error });
                  return of(null);
                })
              )
            )
          )
        );

        return {
          loadAll,
          loadInstance,
          create,
          update,
          delete: remove,
        };
      }
    )
  );
}
