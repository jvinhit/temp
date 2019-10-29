import { Component } from "@angular/core";
import * as algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "OXKZLGNU4D", //B1G2GM9NG0
  "1e3e6a6d6b994bd31f3f2dc5061bf269" //aadef574be1f9252bb48d4ea09b5cfe5
);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    indexName: "merchantTagging",
    searchClient
  };

  public searchParameters = {
    query: ""
  };

  public setQuery({ query }: { query: string }) {
    this.searchParameters.query = query;
  }
}
