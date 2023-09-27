import { Injectable } from '@angular/core';
import { CredentialsInterface, UserInterface } from '#/app/ts/interface';
import { LocalStorage } from '#/app/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  refreshToken: string | null = null;
  accessToken: string | null = null;

  user: UserInterface | null = null;

  constructor() {
    this.refreshToken = localStorage.getItem(LocalStorage.RefreshToken);
    this.accessToken = localStorage.getItem(LocalStorage.AccessToken);
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  login({ token, refreshToken, user }: CredentialsInterface): void {
    this.setAccessToken(token);
    this.setRefreshToken(refreshToken);
    this.setUserInfo(user);
  }

  logout(): void {
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setUserInfo(null);
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;

    if (!token) {
      localStorage.removeItem(LocalStorage.AccessToken);
      return;
    }
    localStorage.setItem(LocalStorage.AccessToken, token);
  }

  setRefreshToken(token: string | null): void {
    this.refreshToken = token;

    if (!token) {
      localStorage.removeItem(LocalStorage.RefreshToken);
      return;
    }
    localStorage.setItem(LocalStorage.RefreshToken, token);
  }

  setUserInfo(user: UserInterface | null): void {
    this.user = user;
  }
}
