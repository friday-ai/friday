import type { SessionAttributes, SessionCredentials } from '@friday-ai/shared';
import SessionModel from '../../models/session';
import { PartialModel } from '../../utils/database/model.partial';
import { Catch } from '../../utils/decorators/error';

import type { GetOptions } from '../../utils/interfaces';
import create from './session.create';
import getAccessToken from './session.getAccessToken';
import revoke from './session.revoke';
import validateAccessToken from './session.validateAccessToken';
import validateRefreshToken from './session.validateRefreshToken';

/**
 * Session
 */
export default class Session extends PartialModel<SessionModel, SessionAttributes> {
  readonly secretJwt: string;

  constructor(secretJwt: string) {
    super(SessionModel);
    this.secretJwt = secretJwt;
  }

  @Catch()
  async create(user: SessionCredentials, userAgent?: string) {
    return create.call(this, user, userAgent);
  }

  @Catch()
  async listAll(options?: GetOptions) {
    return super.listAll(options, { revoked: false });
  }

  @Catch()
  async getAccessToken(token: string) {
    return getAccessToken.call(this, token);
  }

  @Catch()
  async revoke(sessionId: string) {
    return revoke.call(this, sessionId);
  }

  @Catch()
  async validateAccessToken(token: string) {
    return validateAccessToken.call(this, token);
  }

  @Catch()
  async validateRefreshToken(token: string, scope?: string) {
    return validateRefreshToken.call(this, token, scope);
  }
}
