import { Component } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  events: any[] = [];
  filteredEvents: any[] = [];  
  searchText: string = '';

  constructor(private eventService: UserdetailsService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;
        this.filteredEvents = data; 
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
 
  searchEvents() {
    this.filteredEvents = this.events.filter(event =>
      event.eventname.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
