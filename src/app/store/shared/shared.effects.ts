import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '#/app/store/app.state';

@Injectable()
export class SharedEffects {
  // getUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getUsersStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getUsersFromDb().pipe(
  //         map((users) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getUsersSuccess({ users: users });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {}
}
