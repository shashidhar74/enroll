import { Component,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'create_table';
  currentTime: Date = new Date();
  constructor(private KeycloakService:KeycloakService){}
  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }
  user: { username: string } = { username: '' };
  
  ngOnInit(): void {
    this.KeycloakService.isLoggedIn().then((authenticated) => {
      if (authenticated) {
        this.KeycloakService.loadUserProfile().then((profile) => {
  
          this.user = {
            username: profile.username ?? 'DefaultUsername'
          };
          console.log(this.user.username);
        });
      }
    });
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
  logout(){
    debugger;
    this.KeycloakService.logout();
  }
}
