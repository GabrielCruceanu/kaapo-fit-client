import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from '#/app/features/auth/interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '#/environments/environment';
import { User } from '#/app/shared/interfaces/user.interface';
import { ErrorDialogInterceptor } from '#/app/core/interceptor/error-dialog.interceptor';
import { Router } from '@angular/router';
import { AuthTokenInterceptor } from '#/app/features/auth/interceptor/auth-token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environment.api;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  emailLogin(email: string, password: string): Observable<UserAuth> {
    const endpoint = 'auth/email/login';
    const url = `${this.BASE_URL}/${endpoint}`;
    console.log('url: ' + url);
    return this.httpClient.post<UserAuth>(
      url,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
  }

  getProfile() {
    const endpoint = 'auth/me';
    const url = `${this.BASE_URL}/${endpoint}`;
    return this.httpClient.get<User>(url, {
      headers: {
        [ErrorDialogInterceptor.skipHeader]: 'true',
      },
    });
  }

  loginWithRefreshToken() {
    const endpoint = 'auth/refresh';
    const url = `${this.BASE_URL}/${endpoint}`;

    return this.httpClient.post<UserAuth>(
      url,
      {
        refreshToken: this.getRefreshToken(),
      },
      {
        headers: {
          [AuthTokenInterceptor.skipHeader]: 'true',
        },
      },
    );
  }

  async setTokens(response: UserAuth) {
    this.setRefreshToken(response.refreshToken);

    return this.setAccessToken(response.token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getLoginCallbackUrl() {
    return localStorage.getItem('loginCallbackUrl');
  }

  setLoginCallbackUrl(url: string) {
    localStorage.setItem('loginCallbackUrl', url);
  }

  async redirectToCallback() {
    const output = await this.router.navigate([
      this.getLoginCallbackUrl() || '/',
    ]);
  }

  logout() {
    const callback = () => {
      sessionStorage.clear();

      localStorage.clear();
    };
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Adresa de email nu a fost gasita';
      case 'INVALID_PASSWORD':
        return 'Parola invalida';
      case 'EMAIL_EXISTS':
        return 'Adresa de email exista deja';
      case 'MISSING_CUSTOM_TOKEN':
        return 'Lipseste simbolul personalizat';
      default:
        return 'A aparut o eroare necunoscuta. Incerca din nou';
    }
  }
}
