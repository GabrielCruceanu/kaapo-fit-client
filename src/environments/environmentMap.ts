export interface EnvironmentMap {
  production: boolean;
  apiUrl: string;
  socket: string;
  appsProviders: AppsProviders;
}

export interface AppsProviders {
  facebook: string;
  google: string;
  apple: AppleProvider;
}

export interface AppleProvider {
  clientId: string;
  redirectUri: string;
}
