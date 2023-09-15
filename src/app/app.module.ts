import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/partials/navbar/navbar.component';
import { DarkModeService } from './shared/service/dark-mode.service';
import { WindowRefService } from './shared/service/window-ref.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NavbarComponent],
  providers: [provideClientHydration(), DarkModeService, WindowRefService],
  bootstrap: [AppComponent],
})
export class AppModule {}
