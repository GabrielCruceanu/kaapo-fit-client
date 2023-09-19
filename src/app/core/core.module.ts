import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSocket } from '#/app/core/socket/soket-main';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [MainSocket],
})
export class CoreModule {}
