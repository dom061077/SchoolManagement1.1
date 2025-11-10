import { NumbersOnlyDirective } from './numbers-only.directive';

describe('NumbersOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new NumbersOnlyDirective("" as any);
    expect(directive).toBeTruthy();
  });
});
