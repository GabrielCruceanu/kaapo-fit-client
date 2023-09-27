import {
  ApplicationRef,
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
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { AppState } from '#/app/store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRef: WindowRefService,
    private darkModeService: DarkModeService,
    private update: SwUpdate,
    private appRef: ApplicationRef,
    private store: Store<AppState>,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.darkModeService.getModeFromLocalStorage();
      effect(() => {
        this.windowRef.nativeWindow.localStorage.setItem(
          'darkMode',
          JSON.stringify(this.darkModeService.getDarkMode()()),
        );
      });

      this.updateClient();
      this.checkUpdate();
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

  updateClient() {
    if (!this.update.isEnabled) {
      console.log('Not Enable');
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`current`, event.current, `available `, event.available);
      if (confirm('Modificari noi pentru aplicatie, confirma actualizarea.')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log(`current`, event.previous, `available `, event.current);
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update
            .checkForUpdate()
            .then((isNewUpdate) =>
              isNewUpdate ? this.updateClient() : console.log('checked'),
            );
          console.log('update checked');
        });
      }
    });
  }
}
