import { Component, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

const searchClient = algoliasearch(
  'OXKZLGNU4D', //B1G2GM9NG0
  '1e3e6a6d6b994bd31f3f2dc5061bf269' //aadef574be1f9252bb48d4ea09b5cfe5
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  config = {
    indexName: 'merchantTagging',
    searchClient
  };
  constructor(private fb: FormBuilder) {}
  parentForm: FormGroup;

  public searchParameters = {
    query: ''
  };

  public setQuery({ query }: { query: string }) {
    this.searchParameters.query = query;
  }
  ngOnInit() {
    this.parentForm = new FormGroup({
      merchant_tag: new FormArray([]),
      name: new FormControl('')
    });
    // test Path value
    (this.parentForm.controls.merchant_tag as FormArray).push(new FormControl('asd'));
  }
}
