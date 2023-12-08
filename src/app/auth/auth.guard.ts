import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService ,private router: Router,private keycloakService: KeycloakService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean | UrlTree | Observable<boolean | UrlTree>{
  
    const requiredRoles = route.data['roles'] as string[];
    //console.log('Required Roles:', requiredRoles);
    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = this.keycloakService.getUserRoles();
      //console.log('User Roles:', userRoles);
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      //console.log('Has Required Role:', hasRequiredRole);
      if (!hasRequiredRole) {
        Swal.fire({
          title: 'Access denied!',
          timer: 1500,
          color: "#FF0000",
          footer:"User doesn't have the required role."
        
        });
        this.router.navigate(['/home']);
        return false;
      }
     
    }
    return true;
  }
  
}