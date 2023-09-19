import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '#/app/features/auth/store/auth.reducer';
import { AuthState } from '#/app/features/auth/store/auth.state';
import { AUTH_STATE_NAME } from '#/app/features/auth/store/auth.selector';
import { SHARED_STATE_NAME } from '#/app/store/shared/shared.selector';
import { SharedState } from '#/app/store/shared/shared.state';
import { SharedReducer } from '#/app/store/shared/shared.reducer';

export interface AppState {
  router: RouterReducerState;
  [AUTH_STATE_NAME]: AuthState;
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  router: routerReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer,
};
