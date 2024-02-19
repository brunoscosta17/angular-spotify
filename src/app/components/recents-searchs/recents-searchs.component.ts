import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recents-searchs',
  templateUrl: './recents-searchs.component.html',
  styleUrls: ['./recents-searchs.component.scss']
})
export class RecentsSearchsComponent implements OnInit {

  searchField = 'Bruno';
  recentsSearchs = [
    'Top Global',
    'Country Music',
    'Pop',
    'Rock',
    'Blues',
    'Jazz'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setSearchField(value: string): void {
    this.searchField = value;
  }

  search(): void {
    console.log(this.searchField);
  }

}
