import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '#/app/features/auth/services/auth.service';
import { AuthTokenInterceptor } from '#/app/features/auth/interceptor/auth-token.interceptor';

export interface HttpError {
  statusCode: number;
  message: string;
  error?: string;
}

@Injectable()
export class ErrorDialogInterceptor implements HttpInterceptor {
  static skipHeader = 'errorDialog';

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.has(ErrorDialogInterceptor.skipHeader)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      tap(
        () => {},
        (response) => {
          if (response instanceof HttpErrorResponse) {
            if (
              response.status === 401 &&
              this.authService.getRefreshToken() &&
              !request.headers.has(AuthTokenInterceptor.skipHeader)
            ) {
              return;
            }

            this.handleError(response.error);
          }
        },
      ),
    );
  }

  handleError(err: HttpError) {
    console.log(err.message);
  }
}
