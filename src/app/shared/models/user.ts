import { StsTokenManager } from './sts-token-manager';
import { UserMetaData } from './user-meta-data';

export interface User {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetaData;
  phoneNumber: string;
  photoURL: string | undefined;
  providerData: unknown[];
  providerId: string;
  reloadListener: unknown;
  reloadUserInfo: unknown;
  stsTokenManager: StsTokenManager;
  tenantId: string | undefined;
  uid: string;
  refreshToken: string;
}
