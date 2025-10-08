import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-autocomplete-panel',
  template: `
    <mat-autocomplete
      autoActiveFirstOption
      (optionSelected)="onSelect($event)"
    >
      <mat-option *ngFor="let item of results" [value]="item.name || item">
        {{ item.name || item }}
      </mat-option>
    </mat-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePanelComponent {
  results: any[] = [];
  optionSelected = new EventEmitter<any>();

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event.option.value);
  }
}

@Directive({
  selector: '[appAutocomplete]',
  standalone: true,
})
export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() searchAction!: (query: string) => any;
  @Input() results$!: Observable<any[]>;
  @Output() optionSelected = new EventEmitter<any>();

  control = new FormControl('');
  private overlayRef?: OverlayRef;
  private sub = new Subscription();
  private panelRef?: AutocompletePanelComponent;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Listen to input value changes
    this.sub.add(
      this.control.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((query) => {
          if (query && query.length > 1) {
            this.store.dispatch(this.searchAction(query));
          }
        })
    );

    // Bind the FormControl to the native input
    const input = this.elementRef.nativeElement;
    input.addEventListener('input', (e: any) => {
      this.control.setValue(e.target.value, { emitEvent: true });
    });

    // Subscribe to results observable and update overlay dynamically
    this.sub.add(
      this.results$.subscribe((results) => {
        if (results?.length) {
          this.showPanel(results);
        } else {
          this.closePanel();
        }
      })
    );
  }

  private showPanel(results: any[]) {
    if (!this.overlayRef) {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]);

      this.overlayRef = this.overlay.create({
        hasBackdrop: false,
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
      });
    }

    if (!this.panelRef) {
      const portal = new ComponentPortal(AutocompletePanelComponent, this.viewContainerRef);
      const componentRef = this.overlayRef.attach(portal);
      this.panelRef = componentRef.instance;
      this.sub.add(
        this.panelRef.optionSelected.subscribe((option) => {
          this.optionSelected.emit(option);
          this.closePanel();
        })
      );
    }

    this.panelRef.results = results;
    this.cdr.markForCheck();
  }

  private closePanel() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.panelRef = undefined;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.closePanel();
    this.overlayRef?.dispose();
  }
}
