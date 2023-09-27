import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LinkComponent } from '#/app/components/link/link.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive, LinkComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutComponentsModule {}
