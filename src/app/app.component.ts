import {Component, effect, HostBinding, OnInit, signal} from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  darkMode = signal<boolean>(JSON.parse(window.localStorage.getItem('darkMode') ?? 'false'))

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()))
    })
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  ngOnInit() {
    initFlowbite()
  }

}
