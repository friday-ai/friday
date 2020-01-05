import UserType from '../user/user.interface';

/**
 * Session interface.
 */
export default interface SessionType {
  id: string;
  refreshToken?: string;
  revoked?: boolean;
  validUntil?: Date;
  userId?: string;
  accessToken?: string;
  user?: UserType;
}

/**
 * Access token interface
 */
export interface AccessTokenType {
  user: string;
  role: string;
  session: string;
}
