import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText: string = '';

  @Output()
  SearchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput') searchInputEL : ElementRef;

  onSearchTextChanged(){
    // this.SearchTextChanged.emit(this.searchText)
  }

  // updateSearchText(event: any) {
  //    this.searchText = event.target.value;
  // }
  // updateSearchText(inputEL : HTMLInputElement) {
  //   this.searchText = inputEL.value;
  //   this.SearchTextChanged.emit(this.searchText)
  // }
   updateSearchText() {
    this.searchText = this.searchInputEL.nativeElement.value;
    this.SearchTextChanged.emit(this.searchText)
  }
}
