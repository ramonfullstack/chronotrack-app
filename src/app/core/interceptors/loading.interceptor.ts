import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    public LoadingService: LoadingService,
  ) {}

  requests = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.LoadingService.isLoading.next(true);

    this.requests += 1;
    return next.handle(request).pipe(
      finalize(
        () => {
          this.requests -= 1;
          if(this.requests <= 0)
            this.LoadingService.isLoading.next(false);
        }
      )
    );

  }

}
