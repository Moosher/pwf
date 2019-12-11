import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { APIService } from '../services/api.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: APIService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.token || state.url === "/login") {
      return true;
    }
    if(this.authService.token && state.url === "/login"){
      this.router.navigate(['/produtos']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}