import { Injectable, signal, WritableSignal } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class DarkModeService {
  darkMode: WritableSignal<boolean> = signal(
    JSON.parse(
      this.windowRefService.nativeWindow.localStorage.getItem('darkMode') ??
        'false',
    ),
  );

  constructor(private windowRefService: WindowRefService) {}

  setDarkMode(value: boolean): void {
    this.darkMode.set(value);
  }

  getDarkMode(): WritableSignal<boolean> {
    return this.darkMode;
  }

  getModeFromLocalStorage() {
    const value = JSON.parse(
      this.windowRefService.nativeWindow.localStorage.getItem('darkMode') ??
        'false',
    );
    this.darkMode.set(value);
  }
}
