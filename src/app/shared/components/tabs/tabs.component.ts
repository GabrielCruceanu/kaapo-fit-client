import { Component } from '@angular/core';
import { getTabsData, TabModel } from './tabs.data';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from '#/app/shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [NgForOf, RouterLink, RouterLinkActive, SvgIconComponent],
})
export class TabsComponent {
  tabs: TabModel[];

  constructor(private domSanitizer: DomSanitizer) {
    // this.matIconRegistry.addSvgIconLiteral(
    //   'home',
    //   this.domSanitizer.bypassSecurityTrustHtml(HOME_ICON),
    // );
    // this.matIconRegistry.addSvgIconLiteral(
    //   'profile',
    //   this.domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON),
    // );
    // this.matIconRegistry.addSvgIconLiteral(
    //   'add',
    //   this.domSanitizer.bypassSecurityTrustHtml(ADD_ICON),
    // );
    // this.matIconRegistry.addSvgIconLiteral(
    //   'nutrition',
    //   this.domSanitizer.bypassSecurityTrustHtml(NUTRITION_ICON),
    // );
    // this.matIconRegistry.addSvgIconLiteral(
    //   'workout',
    //   this.domSanitizer.bypassSecurityTrustHtml(WORKOUT_ICON),
    // );
    this.tabs = getTabsData();
  }
}
