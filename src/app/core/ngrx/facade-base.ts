/// core/ngrx/facade-base.ts
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CrudActions } from './action-factory';
import { CrudState } from './reducer-factory';

export abstract class BaseFacade<T> {
  items$: Observable<T[]>;
  loading$: Observable<boolean>;

  constructor(
    protected store: Store<{ state: CrudState<T> }>,
    protected actions: CrudActions<T>
  ) {
    this.items$ = this.store.select(state => state['items']);
    this.loading$ = this.store.select(state => state['loading']);
  }

  loadAll() {
    this.store.dispatch(this.actions.loadAll());
  }

  create(item: T) {
    this.store.dispatch(this.actions.create({ item }));
  }

  update(item: T) {
    this.store.dispatch(this.actions.update({ item }));
  }

  delete(id: string | number) {
    this.store.dispatch(this.actions.delete({ id }));
  }
}
