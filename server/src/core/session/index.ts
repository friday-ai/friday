import create from './session.create';
import getAccessToken from './session.getAccessToken';
import getAll from './session.getAll';
import getById from './session.getById';
import revoke from './session.revoke';
import validateAccessToken from './session.validateAccessToken';
import validateRefreshToken from './session.validateRefreshToken';

/**
 * Session
 */
export default class Session {
  create = create;
  getAccessToken = getAccessToken;
  getAll = getAll;
  getById = getById;
  revoke = revoke;
  validateAccessToken = validateAccessToken;
  validateRefreshToken = validateRefreshToken;

  readonly secretJwt: string;

  constructor(secretJwt: string) {
    this.secretJwt = secretJwt;
  }
}
