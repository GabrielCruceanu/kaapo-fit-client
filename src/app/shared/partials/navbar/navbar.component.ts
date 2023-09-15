import { Component, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRefService } from '../../service/window-ref.service';
import { DarkModeService } from '../../service/dark-mode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [WindowRefService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  darkMode: WritableSignal<boolean>;

  constructor(private darkModeService: DarkModeService) {
    this.darkMode = this.darkModeService.getDarkMode();
  }

  ngOnInit() {}

  setDarkMode(darkMode: boolean) {
    this.darkModeService.setDarkMode(darkMode);
  }
}
