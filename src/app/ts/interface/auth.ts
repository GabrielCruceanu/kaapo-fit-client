import { UserInterface } from '#/app/ts/interface/user';

export interface TokensInterface {
  refreshToken: string;
  token: string;
  tokenExpires: number;
}

export interface CredentialsInterface extends TokensInterface {
  user: UserInterface;
}

export interface LoginInterface {
  email: string;
  password: string;
}
