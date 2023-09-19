import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TabsComponent } from '#/app/shared/components/tabs/tabs.component';
import { LoadingSpinnerComponent } from '#/app/shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    NavbarComponent,
    TabsComponent,
    LoadingSpinnerComponent,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
