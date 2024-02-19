import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from '../model/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleListService {
  constructor(private http: HttpClient) { }

  private peopleListUrl = 'https://swapi.dev/api/people?page=';

  getPeople(page: number) {
    return this.http.get<People>(this.peopleListUrl + page);
  }
}