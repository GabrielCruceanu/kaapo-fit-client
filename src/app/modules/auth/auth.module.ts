import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_URL_PROVIDER } from '#/app/modules/auth/interceptors/base-url.interceptor';
import { TOKEN_PROVIDER } from '#/app/modules/auth/interceptors/token.interceptor';
import { APP_INITIALIZER_PROVIDER } from '#/app/modules/auth/app.initializer';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [BASE_URL_PROVIDER, TOKEN_PROVIDER, APP_INITIALIZER_PROVIDER],
})
export class AuthModule {}
