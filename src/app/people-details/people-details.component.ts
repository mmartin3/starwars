import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PeopleDetailsService } from "./people-details.service";
import { Person } from "../model/person.model";

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent {
  id: string = "1";            // Character identifier to send the API
  details: Person|null = null; // Character data received from the API

  constructor(
    private route: ActivatedRoute,
    private peopleDetailsService: PeopleDetailsService) { 
      const id = this.route.snapshot.paramMap.get('id'); // Retrieve ID from URL

      // Set the component's character ID if it is valid
      if (id && !isNaN(Number(id))) {
        this.id = id
      }
  }

  ngOnInit() {
    // Query the API for character details
    this.peopleDetailsService.getDetails(this.id).subscribe(data => this.details = data);
  }
}