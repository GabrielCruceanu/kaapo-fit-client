import { Component, WritableSignal } from '@angular/core';
import { AuthStoreService } from '#/app/modules/auth/services/auth-store.service';
import { AuthService } from '#/app/modules/auth/services/auth.service';
import { DarkModeService } from '#/app/shared/service/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  darkMode: WritableSignal<boolean>;
  links = [
    {
      to: '/',
      text: 'Home',
    },
    {
      to: '/products',
      text: 'Products',
    },
  ];
  authLink = {
    to: '/login',
    text: 'Login',
  };

  constructor(
    private authStore: AuthStoreService,
    private authService: AuthService,
    private darkModeService: DarkModeService,
  ) {
    this.darkMode = this.darkModeService.getDarkMode();
  }

  get userEmail(): string | undefined {
    return this.authStore.user?.email;
  }

  get userName(): string | undefined {
    let username: string | undefined = undefined;
    if (this.authStore.user?.firstName) {
      username = this.authStore.user?.firstName;
    }
    if (this.authStore.user?.lastName) {
      username = this.authStore.user?.lastName;
    }
    if (this.authStore.user?.firstName && this.authStore.user?.lastName) {
      username = `${this.authStore.user?.firstName} + ' ' ${this.authStore.user?.lastName}`;
    }
    return username;
  }

  get isAuthenticated(): boolean {
    return this.authStore.isAuthenticated;
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  setDarkMode(darkMode: boolean) {
    this.darkModeService.setDarkMode(darkMode);
  }
}
