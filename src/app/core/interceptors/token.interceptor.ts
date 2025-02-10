import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '@core/storages/token.service';
import { CookieStorage } from '@core/storages/CookieStorage.services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private cookieService: CookieStorage) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/authorize/auth/anticipation')) {
      const basic_key = btoa(
        `${environment.client_id}:${environment.client_secret}`
      );

      const tokenizedRequest = request.clone({
        headers: request.headers.set('Authorization', `Basic ${basic_key}`),
      });

      return next.handle(tokenizedRequest);
    } else {
      const tokenizedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.cookieService.GetTokenFromCookies()}`
        ),
      });

      return next.handle(tokenizedRequest);
    }
  }
}
