import {
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class DarkModeService {
  darkMode: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode.set(
        JSON.parse(
          this.windowRefService.nativeWindow.localStorage.getItem('darkMode') ??
            'false',
        ),
      );
    }
  }

  setDarkMode(value: boolean): void {
    this.darkMode.set(value);
  }

  getDarkMode(): WritableSignal<boolean> {
    return this.darkMode;
  }

  getModeFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const value = JSON.parse(
        this.windowRefService.nativeWindow.localStorage.getItem('darkMode') ??
          'false',
      );
      this.darkMode.set(value);
    }
  }
}
