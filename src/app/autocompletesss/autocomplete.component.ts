import { Component, Inject, forwardRef, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['autocomplete.component.css']
})
export class AutocompleteComponent extends BaseWidget {
  state: {
    query: string;
    refine: Function;
    indices: object[];
  };
  merchant_tag = new FormArray([]);
  @ViewChild('merchantInput') merchantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Output() onQuerySuggestionClick = new EventEmitter<{ query: string }>();
  @Input() parentForm: FormGroup;
  public merchantTags: any = {
    dataSource: [],
    visible: true,
    selectable: true,
    removable: true,
    addOnBlur: true,
    separatorKeysCodes: [ENTER, COMMA]
  };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('AutocompleteComponent');
  }

  public handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  public ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
  addTag(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const { input, value = '' } = event;
      if (value.trim()) {
        this.merchant_tag.push(new FormControl(value.trim()));
      }
      if (input) {
        input.value = '';
      }
    }
  }

  removeTag(index: number): void {
    this.merchant_tag.removeAt(index);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.merchantInput.nativeElement.value = '';
    // this.onQuerySuggestionClick.emit({ query: event.option.value });
    this.merchant_tag.push(new FormControl(event.option.value.trim()));
  }
}
