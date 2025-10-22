import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CrudState } from './reducer-factory';
import { CrudActions } from './action-factory';

export abstract class BaseFacade<T> {
  items$: Observable<T[]>;
  loading$: Observable<boolean>;

  constructor(
    protected store: Store<{ [key: string]: CrudState<T> }>,
    protected actions: CrudActions<T>,
    protected featureKey: string
  ) {
    this.items$ = this.store.select(state => state[this.featureKey]?.items || []);
    this.loading$ = this.store.select(state => state[this.featureKey]?.loading || false);
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
