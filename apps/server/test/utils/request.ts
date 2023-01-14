import request from 'supertest';
import { superadmin } from './apiToken';

enum Methods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

const authenticatedRequest = (methode: Methods, url: string, token?: string) => {
  let header = `Bearer ${superadmin}`;

  if (token !== undefined) {
    header = `Bearer ${token}`;
  }

  return request(global.TEST_SERVER)[methode](url).set('Accept', 'application/json').set('Authorization', header);
};

export default {
  get: (url: string, token?: string) => authenticatedRequest(Methods.GET, url, token),
  post: (url: string, token?: string) => authenticatedRequest(Methods.POST, url, token),
  patch: (url: string, token?: string) => authenticatedRequest(Methods.PATCH, url, token),
  delete: (url: string, token?: string) => authenticatedRequest(Methods.DELETE, url, token),
};
