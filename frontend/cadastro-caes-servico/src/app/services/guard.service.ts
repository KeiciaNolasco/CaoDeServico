import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {

  constructor(
    private authService: OAuthService, 
    private router: Router
) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
