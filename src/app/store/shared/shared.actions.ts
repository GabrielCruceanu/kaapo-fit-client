import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[Shared state] Set loading spinner';
export const SET_ERROR_MESSAGE = '[Shared state] Set error message';

export const GET_USERS_START = '[Shared page] get users start';
export const GET_USERS_SUCCESS = '[Shared page] get users success';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>(),
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>(),
);

// ---> Get Users <---

// export const getUsersStart = createAction(GET_USERS_START);
//
// export const getUsersSuccess = createAction(
//   GET_USERS_SUCCESS,
//   props<{ users: UserProfile[] | [] }>()
// );
