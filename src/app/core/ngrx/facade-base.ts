// core/ngrx/facade-base.ts
import { Store } from '@ngrx/store';

export abstract class BaseFacade<T extends { id?: string | number }> {
  constructor(
    protected store: Store,
    private actions: any,
    private selectors: any
  ) {}

  all$ = this.store.select(this.selectors.selectAll);
  loading$ = this.store.select(this.selectors.selectLoading);
  error$ = this.store.select(this.selectors.selectError);

  load() {
    this.store.dispatch(this.actions.load());
  }

  create(data: T) {
    this.store.dispatch(this.actions.create({ data }));
  }

  update(data: T) {
    this.store.dispatch(this.actions.update({ data }));
  }

  delete(id: string | number) {
    this.store.dispatch(this.actions.delete({ id }));
  }
}
