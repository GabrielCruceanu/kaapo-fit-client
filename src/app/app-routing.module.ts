import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateAuthGuard } from '#/app/features/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (m) => m.DefaultComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('src/app/pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('src/app/pages/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('src/app/pages/products/products.component').then(
            (m) => m.ProductsComponent,
          ),
        canActivate: [canActivateAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
