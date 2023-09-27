import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '#/app/store/app.state';
import { AuthService } from '#/app/features/auth/services/auth.service';
import { isLoggedIn } from '#/app/features/auth/store/auth.selector';

@Injectable()
class PermissionsService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { redirect, requireAuth } = next.data;

    return this.store.pipe(
      select(isLoggedIn),
      tap((isLogged) => {
        const isAuthRequired = requireAuth == null || requireAuth;

        const isAccessAllowed =
          (isAuthRequired && isLogged) || (!isAuthRequired && !isLogged);

        if (!isAccessAllowed) {
          if (requireAuth == null || requireAuth) {
            this.authService.setLoginCallbackUrl(state.url);
          }

          if (redirect) {
            if (redirect instanceof Array) {
              this.router.navigate([...redirect]);
            } else {
              this.router.navigate([redirect]);
            }

            return false;
          }

          if (this.router.routerState.snapshot.url === '') {
            this.router.navigate(isAuthRequired ? ['/login'] : ['/']);

            return false;
          }
        }
        if (!isLogged) {
          this.router.navigateByUrl('/login');
        }

        return isAccessAllowed;
      }),
    );
  }
}

export const canActivateAuthGuard: () => PermissionsService = () => {
  return inject(PermissionsService);
};
