import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestHeaders: any = {};

    if (
      !request.headers.has('Content-Type') &&
      !(request.body instanceof FormData)
    ) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    if (this.authService.isLogged()) {
      requestHeaders.Authorization = `Bearer ${this.authService.isLogged()}`;
    }
    const modified = request.clone({
      setHeaders: requestHeaders,
    });

    return next.handle(modified);
  }
}
