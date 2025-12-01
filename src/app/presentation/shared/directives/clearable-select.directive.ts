import { AfterViewInit, computed, Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
    this.tryCreateClearButton(5);
  }

  private tryCreateClearButton(attemptsLeft: number): void {
    if (this.clearButton) return; // Stop if already created

    // Search for the wrapper, which should be the positioning context (position: relative)
    const formFieldWrapper = this.elementRef.nativeElement.closest('.mat-mdc-text-field-wrapper');
    
    if (formFieldWrapper) {
      // Success: Element found, create and attach the button
      this.createClearButton(formFieldWrapper as HTMLElement);
      this.updateClearButtonVisibility();
    } else if (attemptsLeft > 0) {
      // Failure: Element not found, schedule a retry in the next microtask
      console.warn(`ClearableSelectDirective: Wrapper not found. Retrying... (${attemptsLeft - 1} left)`);
      
      // Use Promise.resolve().then() to ensure the retry runs after Angular's current cycle finishes
      Promise.resolve().then(() => {
        this.tryCreateClearButton(attemptsLeft - 1);
      });
    } else {
      console.error('ClearableSelectDirective: CRITICAL - Failed to attach clear button after multiple retries. DOM not ready.');
    }
  }


  /**
   * Creates the clear button element and attaches the click listener.
   * @param targetElement The wrapper element to append the button to.
   */
  private createClearButton(targetElement: HTMLElement): void {
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

    // 5. Append the button to the *targetElement* (the form field wrapper).
    this.renderer.appendChild(targetElement, this.clearButton);
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




