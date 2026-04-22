import { NumbersOnlyDirective } from './numbers-only.directive';

describe('NumbersOnlyDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: { value: '' } };
    const mockNgControl = { control: { setValue: jasmine.createSpy('setValue') } };
    const directive = new NumbersOnlyDirective(mockElementRef as any, mockNgControl as any);
    expect(directive).toBeTruthy();
  });
});
