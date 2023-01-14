import { generateAccessToken } from '../../src/utils/jwt';

const guest = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'guest', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');

const habitant = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'habitant', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');

const admin = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'admin', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');

const superadmin = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'superadmin', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');

export { guest, habitant, admin, superadmin };
