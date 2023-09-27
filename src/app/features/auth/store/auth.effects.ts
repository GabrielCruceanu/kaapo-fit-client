import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  signupSuccess,
} from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '#/app/store/app.state';
import { Router } from '@angular/router';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '#/app/store/shared/shared.actions';
import { AuthService } from '#/app/features/auth/services/auth.service';
import { UserAuth } from '#/app/features/auth/interfaces/auth.interface';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) => {
        console.log('action', action);
        return this.authService.emailLogin(action.email, action.password).pipe(
          map((userAuth: UserAuth) => {
            this.store.dispatch(setErrorMessage({ message: '' }));

            this.authService.setTokens(userAuth);

            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loginSuccess({ userAuth: userAuth, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message,
            );
            return of(setErrorMessage({ message: errorMessage }));
          }),
        );
      }),
    );
  });
  //
  // signUp$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(signupStart),
  //     exhaustMap((action) => {
  //       return this.authService.onSignUp(action.email, action.password).pipe(
  //         map((data) => {
  //           // Define the user
  //           const userAuth = this.authService.formatUser(data);
  //
  //           //Save user local and in Firestore
  //           this.authService.setUserAuthInLocalStorage(userAuth);
  //           return signupSuccess({
  //             userAuth: userAuth,
  //             username: action.username,
  //             redirect: true,
  //           });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = this.authService.getErrorMessage(
  //             errResp.error.error.message,
  //           );
  //           return of(setErrorMessage({ message: errorMessage }));
  //         }),
  //       );
  //     }),
  //   );
  // });
  //
  // signupSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(signupSuccess),
  //     map((action) => {
  //       const coverImage = {
  //         downloadURL:
  //           'https://firebasestorage.googleapis.com/v0/b/kaapo-fit.appspot.com/o/cover.jpg?alt=media&token=8b6f1f36-17ff-49b4-b00e-155353f7b1f2',
  //         path: '/',
  //       };
  //       const profileImage = {
  //         downloadURL:
  //           'https://firebasestorage.googleapis.com/v0/b/kaapo-fit.appspot.com/o/user.jpg?alt=media&token=4954929e-51aa-41eb-860e-b7709460428f',
  //         path: '/',
  //       };
  //       const userProfile = this.authService.formatUserProfileForDb(
  //         action.userAuth,
  //         action.username,
  //         false,
  //         new Date().getUTCDate(),
  //         new Date().getUTCMonth() + 1,
  //         new Date().getUTCFullYear(),
  //         null,
  //         coverImage,
  //         profileImage,
  //       );
  //       this.authService.createUsernameInDb(userProfile);
  //
  //       return createUserProfileStart({ userProfile: userProfile });
  //     }),
  //   );
  // });
  //
  // resetPassword$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(resetStart),
  //     exhaustMap((action) => {
  //       return this.authService.onResetPassword(action.email).then(() => {
  //         return resetSuccess({ redirect: true });
  //       });
  //     }),
  //   );
  // });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        return this.authService.loginWithRefreshToken().pipe(
          map((response) => {
            console.log('user: ' + response);

            if (response) {
              this.authService.setTokens(response);
              return loginSuccess({ userAuth: response, redirect: false });
            } else {
              return autoLogout();
            }
          }),
        );
      }),
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map(() => {
          this.router.navigate(['/']).then(() => this.authService.logout());
        }),
      );
    },
    { dispatch: false },
  );

  authRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        }),
      );
    },
    { dispatch: false },
  );
  //
  // resetSuccess$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(resetSuccess),
  //       tap((action) => {
  //         this.store.dispatch(setErrorMessage({ message: '' }));
  //         if (action.redirect) {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           this.router.navigate(['/autentificare']);
  //         }
  //       }),
  //     );
  //   },
  //   { dispatch: false },
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {}
}
