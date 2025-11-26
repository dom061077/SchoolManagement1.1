import { AfterViewInit, computed, Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { MatSelect } from '@angular/material/select';



@Directive({
  selector: '[appClearableSelect]',
  standalone: true,
  // The directive's styles are included here for simplicity in a single-file environment.
  host: {
    // Add a class to the mat-select host element to adjust positioning and padding.
    '[class.clearable-select-host]': 'true',
  },
})
export class ClearableSelectDirective implements AfterViewInit, OnDestroy {
  // Use inject() for dependencies
  private matSelect = inject(MatSelect);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  private clearButton: HTMLButtonElement | null = null;
  private unsubscribeFn: (() => void)[] = [];

  // Computed signal to track if the select has a value.
  private hasValue = computed(() => !!this.matSelect.value);

  constructor() {
    // Listen for value changes using the MatSelect's valueChange observable
    // to control the visibility of the clear button.
    this.matSelect.valueChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.updateClearButtonVisibility();
    });
  }

  ngAfterViewInit(): void {
    // We need to wait for the MatSelect to fully render its structure.
    setTimeout(() => {
      this.createClearButton();
      this.updateClearButtonVisibility();
    });
  }

  /**
   * Creates the clear button element and attaches the click listener.
   */
  private createClearButton(): void {
    if (this.clearButton) return;

    // 1. Create the button element
    this.clearButton = this.renderer.createElement('button') as HTMLButtonElement;

    // 2. Set button attributes and classes for styling
    this.renderer.setAttribute(this.clearButton, 'type', 'button');
    this.renderer.setAttribute(this.clearButton, 'aria-label', 'Clear Selection');
    // Using Tailwind classes for Material design look
    this.renderer.addClass(this.clearButton, 'clearable-select-button'); 
    this.renderer.addClass(this.clearButton, 'absolute');
    this.renderer.addClass(this.clearButton, 'z-10');
    this.renderer.addClass(this.clearButton, 'right-0');
    this.renderer.addClass(this.clearButton, 'p-1');
    this.renderer.addClass(this.clearButton, 'rounded-full');
    this.renderer.addClass(this.clearButton, 'hover:bg-gray-200');
    this.renderer.addClass(this.clearButton, 'transition-colors');
    this.renderer.addClass(this.clearButton, 'focus:outline-none');

    // 3. Add the close icon inside the button
    const iconSpan = this.renderer.createElement('span');
    this.renderer.addClass(iconSpan, 'material-icons-outlined');
    this.renderer.addClass(iconSpan, 'text-gray-500');
    this.renderer.addClass(iconSpan, 'text-base');
    const iconText = this.renderer.createText('close');
    this.renderer.appendChild(iconSpan, iconText);
    this.renderer.appendChild(this.clearButton, iconSpan);

    // 4. Attach the click handler
    const listener = this.renderer.listen(this.clearButton, 'click', (event) => {
      this.handleClear(event);
    });
    this.unsubscribeFn.push(listener);

    // 5. Append the button to the host element's parent, which is the mat-form-field container.
    // This allows us to position it relative to the entire form field.
    const formFieldElement = this.elementRef.nativeElement.closest('.mat-mdc-form-field-infix');
    if (formFieldElement) {
      // Find the trailing action container to position the button correctly
      const trailingContainer = formFieldElement.closest('.mat-mdc-text-field-wrapper')?.querySelector('.mat-mdc-form-field-trailing-icon');
      if (trailingContainer) {
        // We insert it before the dropdown arrow to occupy the same space
        this.renderer.insertBefore(trailingContainer.parentNode, this.clearButton, trailingContainer);
        // Add a class to the MatSelect element to make room for the new button
        this.renderer.addClass(this.elementRef.nativeElement, 'clear-select-padding');
      } else {
        // Fallback: append to the form field wrapper
        this.renderer.appendChild(this.elementRef.nativeElement.parentNode, this.clearButton);
      }
    }
  }

  /**
   * Clears the selected value of the MatSelect.
   * @param event The click event.
   */
  private handleClear(event: MouseEvent): void {
    // Crucially, stop propagation to prevent the mat-select from opening its panel
    event.stopPropagation();
    
    // Clear the value in the MatSelect component
    this.matSelect.value = null; 
    this.matSelect.writeValue(null);
    
    // Emit the change event to update the bound model (signal or form control)
    this.matSelect.valueChange.emit(null);
    
    // Manually trigger change detection (if needed, though signals/valueChange should handle it)
    this.matSelect.stateChanges.next();
  }

  /**
   * Updates the visibility of the clear button based on the current select value.
   */
  private updateClearButtonVisibility(): void {
    if (this.clearButton) {
      if (this.hasValue()) {
        this.renderer.removeStyle(this.clearButton, 'display');
      } else {
        this.renderer.setStyle(this.clearButton, 'display', 'none');
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    this.unsubscribeFn.forEach(unsub => unsub());
    // Remove the button from the DOM
    if (this.clearButton) {
      this.renderer.removeChild(this.renderer.parentNode(this.clearButton), this.clearButton);
      this.clearButton = null;
    }
  }
}

function takeUntilDestroyed(): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
