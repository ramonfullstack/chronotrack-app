import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieStorage } from '@core/storages/CookieStorage.services';
import { TokenService } from '@storages/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router, private cookieService: CookieStorage) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.cookieService.GetTokenFromCookies()) {
      return true;
    }

    this.router.navigate(['admin']);

    return false;
  }
}
