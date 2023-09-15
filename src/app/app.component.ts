import {Component, HostBinding, OnInit, signal} from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  darkMode = signal<boolean>(false)

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  ngOnInit() {
    initFlowbite()
  }

}
