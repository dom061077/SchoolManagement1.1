import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]' // Use it as an attribute: <input matInput numbersOnly>
})
export class NumbersOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    // Use a regex to replace any character that ISN'T a digit (0-9) with an empty string
    // If you need to allow decimals, change the regex to /[^0-9.]*/g or similar
    const newValue = initialValue.replace(/[^0-9]*/g, '');

    // Update the input field's value
    this.el.nativeElement.value = newValue;

    // If the value changed (meaning a non-numeric character was removed),
    // stop the event propagation to prevent other handlers from using the bad input.
    if (initialValue !== newValue) {
      event.stopPropagation();
    }
  }

  // Optional: You can also use HostListener('keydown', ...) to prevent keys like 'e', '+', '-' 
  // from being typed, but the 'input' listener is generally more effective for handling
  // paste and all non-numeric input methods consistently.
}