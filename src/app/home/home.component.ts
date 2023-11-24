import { Component } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  events: any[] = [];
  filteredEvents: any[] = [];  
  searchText: string = '';

  constructor(private eventService: UserdetailsService,private KeycloakService:KeycloakService) {}

  async ngOnInit(): Promise<void> {
    //await this.KeycloakService.init(); 
    if (await this.KeycloakService.isLoggedIn()) {
      // Access token is available
      const accessToken = this.KeycloakService.getKeycloakInstance().token;
      console.log('Access Token:', accessToken);

      // ID token is available
      const idToken = this.KeycloakService.getKeycloakInstance().idToken;
      console.log('ID Token:', idToken);
    }
  

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
