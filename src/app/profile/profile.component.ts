import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  constructor( private keycloak:KeycloakService, private userService: UserdetailsService,private router:Router,private http: HttpClient) {}
 ngOnInit(){
  this.keycloak.isLoggedIn().then((authenticated) => {
    if (authenticated) {
      this.keycloak.loadUserProfile().then((profile) => {
        this.user = {
          username: profile.username,
          email: profile.email,
          first_name:profile.firstName,
          last_name:profile.lastName,
          id:profile.id
          // Add more user attributes as needed
        };
      });
    }
  });
}
showProfile = true;
closeProfile(){
this.showProfile=false;
}
loggedInUserName: string='' // Initialize it with the logged-in username

logout(){

}
  // Function to set the logged-in username when the user logs in
  setUserLoggedIn(username: string) {
    this.loggedInUserName = username;
    console.log(this.loggedInUserName);
  }
}
