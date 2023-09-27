import { EnvironmentMap } from '#/environments/environmentMap';

export const environment: EnvironmentMap = {
  production: true,
  apiUrl: 'https://kaapo.fit/api',
  socket: 'https://kaapo.fit',
  appsProviders: {
    facebook: '535472397651204',
    google:
      '331672215174-0hlpm8fhjphiou05ovsd82vglor401ct.apps.googleusercontent.com',
    apple: {
      clientId: 'kaapo.fit',
      redirectUri: 'https://kaapo.fit/',
    },
  },
};
