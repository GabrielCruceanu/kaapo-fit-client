import { UserAuth } from '#/app/features/auth/interfaces/auth.interface';

export interface AuthState {
  userAuth: UserAuth | null;
}

export const initialState: AuthState = {
  userAuth: null,
};
