import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStoreService } from '#/app/modules/auth/services/auth-store.service';

export const AUTHORIZATION_HEADER_KEY = 'Authorization';
export const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.authStore.accessToken) {
      return next.handle(
        request.clone({
          headers: request.headers.set(
            AUTHORIZATION_HEADER_KEY,
            `${AUTHORIZATION_HEADER_PREFIX} ${this.authStore.accessToken}`,
          ),
        }),
      );
    }
    return next.handle(request);
  }
}

export const TOKEN_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
