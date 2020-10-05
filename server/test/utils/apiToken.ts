import { generateAccessToken } from '../../src/utils/jwt';

const habitant = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'habitant', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');

const admin = generateAccessToken('c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a', 'admin', 'baebcfc9-8ca0-4803-9f56-15519f05eefd', 'secretJwt');

const superadmin = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'superadmin', '2c23ba16-a4a0-4015-bb1b-7ecba3375260', 'secretJwt');

export {
  habitant,
  admin,
  superadmin,
};
