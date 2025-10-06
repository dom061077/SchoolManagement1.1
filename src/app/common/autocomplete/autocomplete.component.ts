// autocomplete.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder = 'Search...';
  @Input() results$!: any; // Observable from NgRx selector
  @Input() searchAction!: (query: string) => any; // Action creator

  @Output() optionSelected = new EventEmitter<any>();

  control = new FormControl('');

  constructor(private store: Store) {}

  ngOnInit() {
    this.control.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.store.dispatch(this.searchAction(value));
      });
  }

  selectOption(option: any) {
    this.optionSelected.emit(option);
  }
}
