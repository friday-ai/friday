import request from 'supertest';
import { generateAccessToken } from '../../src/utils/jwt';

enum Methodes {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete'
}

const authenticatedRequest = (methode: Methodes, url: string) => {
  const accessToken = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'HABITANT', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');
  const header = `Bearer ${accessToken}`;

  // @ts-ignore
  return request(global.TEST_SERVER)[methode](url)
    .set('Accept', 'application/json')
    .set('Authorization', header);
};

export default {
  get: (url: string) => authenticatedRequest(Methodes.GET, url),
  post: (url: string) => authenticatedRequest(Methodes.POST, url),
  patch: (url: string) => authenticatedRequest(Methodes.PATCH, url),
  delete: (url: string) => authenticatedRequest(Methodes.DELETE, url),
};
