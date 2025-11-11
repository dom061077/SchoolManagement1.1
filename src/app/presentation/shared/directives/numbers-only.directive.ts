import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]' // Use it as an attribute: <input matInput numbersOnly>
})

export class NumbersOnlyDirective {

  // 2. Inject NgControl in the constructor
  constructor(
    private el: ElementRef, 
    private ngControl: NgControl // Inject NgControl
  ) { }

  @HostListener('input', ['$event']) 
  onInputChange(event: any) {
    const initialValue: string = this.el.nativeElement.value;
    
    // 3. Sanitize the value
    const newValue = initialValue.replace(/[^0-9]*/g, '');
    
    // Update the DOM element's value
    this.el.nativeElement.value = newValue;
    
    // 4. Update the Angular Form Control's value (Model)
    if (initialValue !== newValue) {
        this.ngControl.control?.setValue(newValue, { emitEvent: false });
    }
    
    // Note: Do NOT use event.stopPropagation() here
  }
}