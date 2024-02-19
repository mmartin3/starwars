import { Component } from '@angular/core';
import { PeopleListService } from './people-list.service';
import { People } from '../model/people.model';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {
  people: People|null = null;                                     // Current page of data received from the API
  firstPage: number = 1;                                          // Minimum page number
  lastPage: number = this.firstPage;                              // Maximum page number
  currentPage: number = this.firstPage;                           // Selected page number to send to SWAPI
  pages: number[] = [this.firstPage];                             // Array of page numbers
  private cache: Map<number, People> = new Map<number, People>(); // Temporary cache of data retrieved from SWAPI
  private rpp: number|null = null;                                // Results per page

  constructor(private peopleListService: PeopleListService) { }

  ngOnInit() {
    this.goToPage(this.firstPage); // Load the first page
  }

  goToPage(page: number) {
    // Page number validation
    page = Math.max(this.firstPage, page);
    page = Math.min(this.lastPage, page);

    if (this.people && page == this.currentPage) {
      return; // Selected page is already loaded
    }

    this.currentPage = page;
    this.getPeople();
  }

  private getPeople() {
    if (this.cache.has(this.currentPage)) {
      this.people = this.cache.get(this.currentPage) ?? null;
    } else {
      this.people = null; // Reset character data so progress bar appears while loading

      // Query the API for the selected page of characters
      this.peopleListService.getPeople(this.currentPage).subscribe(data => {
        this.people = this.processResponse(data);
        this.rpp = Math.max(1, this.rpp ?? this.people.results.length);
        this.lastPage = Math.ceil(this.people.count / this.rpp);
        this.pages = Array(this.lastPage).fill(1).map((_, i) => i + 1);
        this.cache.set(this.currentPage, this.people);
      });
    }
  }

  private processResponse(people: People): People {
    for (let i = 0; i < people.results.length; i++) {
      people.results[i].id = people.results[i].url.replaceAll(/[^0-9]/g, '');
      people.results[i].details = people.results[i].url.replace('https://swapi.dev/api', '');
    }

    return people;
  }
}