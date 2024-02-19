import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Navigation } from '@angular/router';
import { StoreFetchDataComponent } from '../dashboard/store-fetch-data/store-fetch-data.component';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {

  constructor(private router: Router, private localData: StoreFetchDataComponent) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.isNavigationByUser()) {
      if (state.url !== '/') {
        this.router.navigate(['/']);
      }
      return false;
    }
    return true;
  }

  private isNavigationByUser(): boolean {
    const currentUser = this.localData.getUserLoginId();
    return currentUser != null && currentUser != undefined && currentUser != "";
  }
}
