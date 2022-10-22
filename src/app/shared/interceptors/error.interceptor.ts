import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errHttp: any) => {
        let errorMessage = errHttp.error.message || errHttp.statusText;

        if (errHttp.status === 401) {
          errorMessage = 'Your session has expired. Please login again.';
          this.authService.signout();
        }
        return throwError(() => new Error(errHttp));
      })
    );
  }
}
