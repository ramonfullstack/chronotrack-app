import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CookieStorage {

  constructor(
    private cookieService : CookieService,
    private router: Router
  ) { }

  SetTokenOnCookies(token: any) {
    this.cookieService.set('token', token, { path: '/', secure: true});
  }
  
  GetTokenFromCookies() : string {
    return this.cookieService.get('token');
  }

  GetRoles(): string[] {
    const token = this.GetTokenFromCookies();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.role || [];
    }
    return [];
  }
  
  RemoveTokenFromCookies() {
    this.cookieService.delete('token', '/');
    this.router.navigateByUrl('/login');
  }

}
