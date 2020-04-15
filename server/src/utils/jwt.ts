import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import util from 'util';

const accessTokenValidity = 24 * 60 * 60; // access token is valid 24 hours
const refreshTokenValidity = 15 * 24 * 60 * 60; // refresh token is valid 15 days
const randomBytes = util.promisify(crypto.randomBytes);
const tokenLenght = 500;
const apiKeyLenght = 32;
const env = process.env.NODE_ENV || 'production';

/**
 * Hash a token
 * @param {string} token - The token to hash.
 * @returns {string} The hash of the token.
 */
export function hashToken(token: string) {
  const tokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  return tokenHash;
}

/**
 * Generate a jwt secret.
 * @private
 * @returns {string} JwtSecret.
 */
export function generateJwtSecret() {
  if (env === 'test') {
    return 'secretJwt';
  }

  const jwtSecret = crypto
    .randomBytes(Math.ceil(tokenLenght / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, tokenLenght); // return required number of characters

  return jwtSecret;
}

/**
 * Generate an access token.
 * @private
 * @param {string} userId - The UserId.
 * @param {string} role - The user's role.
 * @param {string} sessionId - The session ID.
 * @param {string} jwtSecret - JWT secret.
 * @returns {string} Return accessToken.
 */
export function generateAccessToken(userId: string, role: string, sessionId: string, jwtSecret: string) {
  return jwt.sign({ user: userId, role, session: sessionId }, jwtSecret, {
    algorithm: 'HS256',
    audience: 'user',
    issuer: 'friday',
    expiresIn: accessTokenValidity,
  });
}

/**
 * Generate a refresh token and its hash.
 * @private
 * @returns {Promise} Resolving with refreshToken, refreshTokenHash and refreshTokenValidity.
 */
export async function generateRefreshToken() {
  const refreshToken = (await randomBytes(Math.ceil(tokenLenght / 2)))
    .toString('hex')
    .slice(0, tokenLenght);
  const refreshTokenHash = hashToken(refreshToken);

  return {
    refreshToken,
    refreshTokenHash,
    refreshTokenValidity,
  };
}

/**
 * Generate a refresh token and its hash.
 * @private
 * @returns {Promise} Resolving with apiKey and apiKeyHash.
 */
export async function generateApiKey() {
  const apiKey = (await randomBytes(Math.ceil(apiKeyLenght / 2))).toString('hex').slice(0, apiKeyLenght);
  const apiKeyHash = hashToken(apiKey);

  return {
    apiKey,
    apiKeyHash,
  };
}
