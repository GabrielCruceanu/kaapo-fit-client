import {
  Component,
  effect,
  HostBinding,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
import { WindowRefService } from './shared/service/window-ref.service';
import { DarkModeService } from './shared/service/dark-mode.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRef: WindowRefService,
    private darkModeService: DarkModeService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.darkModeService.getModeFromLocalStorage();
      effect(() => {
        this.windowRef.nativeWindow.localStorage.setItem(
          'darkMode',
          JSON.stringify(this.darkModeService.getDarkMode()()),
        );
      });
    }
  }

  @HostBinding('class.dark') get mode() {
    return (
      isPlatformBrowser(this.platformId) && this.darkModeService.getDarkMode()()
    );
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
