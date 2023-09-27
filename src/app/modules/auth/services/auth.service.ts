import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CredentialsInterface,
  LoginInterface,
  TokensInterface,
  UserInterface,
} from '#/app/ts/interface';
import { map, Observable } from 'rxjs';
import { ApiRoutes } from '#/app/ts/enum';
import { AuthStoreService } from '#/app/modules/auth/services/auth-store.service';
import {
  AUTHORIZATION_HEADER_KEY,
  AUTHORIZATION_HEADER_PREFIX,
} from '#/app/modules/auth/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private authStore: AuthStoreService,
  ) {}

  get hasAccessToken(): boolean {
    return !!this.authStore.accessToken;
  }

  login(
    payload: LoginInterface,
    typeOfLogin: ApiRoutes,
  ): Observable<CredentialsInterface> {
    return this.http.post<CredentialsInterface>(typeOfLogin, payload).pipe(
      map((credentials: CredentialsInterface) => {
        this.authStore.login(credentials);
        return credentials;
      }),
    );
  }

  logout() {
    return this.http.post<void>(ApiRoutes.Logout, {}).pipe(
      map(() => {
        this.authStore.logout();
      }),
    );
  }

  getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(ApiRoutes.UserInfo).pipe(
      map((userInfo: UserInterface) => {
        this.authStore.setUserInfo(userInfo);
        return userInfo;
      }),
    );
  }

  refreshToken(): Observable<TokensInterface> {
    const headers = {
      [AUTHORIZATION_HEADER_KEY]: `${AUTHORIZATION_HEADER_PREFIX} ${this.authStore.refreshToken}`,
    };

    return this.http.get<TokensInterface>(ApiRoutes.Refresh, { headers }).pipe(
      map(({ token, tokenExpires, refreshToken }: TokensInterface) => {
        this.authStore.setAccessToken(token);
        this.authStore.setRefreshToken(refreshToken);
        return { token, tokenExpires, refreshToken };
      }),
    );
  }
}
