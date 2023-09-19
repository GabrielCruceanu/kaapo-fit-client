import { EnvironmentMap } from '#/environments/environmentMap';

export const environment: EnvironmentMap = {
  production: false,
  api: 'http://localhost:3000/api/v1',
  socket: 'http://localhost:4200',
  appsProviders: {
    facebook: '535472397651204',
    google:
      '331672215174-0hlpm8fhjphiou05ovsd82vglor401ct.apps.googleusercontent.com',
    apple: {
      clientId: 'kaapo-fit',
      redirectUri: 'http://localhost:4200/',
    },
  },
};
