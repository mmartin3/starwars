import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleDetailsService {
  private peopleDetailsUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getDetails(id: string): Observable<Person> {
    return this.http.get<Person>(this.peopleDetailsUrl + id);
  }
}