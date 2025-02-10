import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '@storages/token.service';
import { UtilsService } from '@shared/services/utils.service';
import { CookieStorage } from '@core/storages/CookieStorage.services';

@Injectable()
export class NotificationsInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private token: TokenService,
    private utilsService: UtilsService,
    private cookieServices: CookieStorage
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          // if (event instanceof HttpResponse && event.status === 200 && event.body.hasOwnProperty('message')) {
          //   this.utilsService.notification(event.body.message, 'sucesso');
          // }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.route.navigateByUrl('/login');
            this.cookieServices.RemoveTokenFromCookies();
            this.utilsService.notification('Acesso não autorizado', 'error');
          } else if (error.status === 403) {
            if (error.error != null && error.error.message)
              this.utilsService.notification(error.error.message, 'error');
            else
              this.utilsService.notification(
                'Você não possui acesso!',
                'error'
              );
          } else {
            // if (error.error instanceof Blob) {
            //   this.utilsService.notification('Imagem não encontrada', 'error');
            // } else {
            //   this.utilsService.notification(
            //     error.error.message
            //       ? error.error.message
            //       : JSON.stringify(error.error.errors),
            //     'error'
            //   );
            // }
          }
        }
      )
    );
  }
}
