import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({ providedIn: 'root' })
export class isGuestGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('userData');
    if (token) {
      return this.router.createUrlTree(['/']);
    }
    return true; 
  }
}