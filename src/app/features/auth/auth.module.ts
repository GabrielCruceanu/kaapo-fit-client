import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '#/app/features/auth/services/auth.service';
import { LayoutModule } from '#/app/shared/partials/layout/layout.module';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, LayoutModule],
  providers: [AuthService],
})
export class AuthModule {}
