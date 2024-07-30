import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recents-searchs',
  templateUrl: './recents-searchs.component.html',
  styleUrls: ['./recents-searchs.component.scss']
})
export class RecentsSearchsComponent implements OnInit {

  searchField = '';
  recentsSearchs = [
    'Top Global',
    'Country Music',
    'Pop',
    'Rock',
    'Blues',
    'Jazz'
  ];
  selectedItem: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSearchField(value: string): void {
    this.searchField = value;
    this.selectedItem = value;

  }

  search(): void {
    console.log(this.searchField);
  }

}
