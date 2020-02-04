import request from 'supertest';
import Friday from '../../src/core/friday';
import Server from '../../src/api/app';
import { generateAccessToken } from '../../src/utils/jwt';

const port = parseInt(process.env.PORT!, 10) || 3000;

// tslint:disable-next-line: completed-docs
export default class TestServer {
  public app!: Server['start'];
  public accessToken!: string;
  public header!: string;

  constructor() {
    this.start();
    this.accessToken = generateAccessToken('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'HABITANT', '894b93df-a7ab-494c-92f6-7d88ae9164b3', 'secretJwt');
    this.header = `Bearer ${this.accessToken}`;
  }

  // tslint:disable-next-line: completed-docs
  start() {
    try {
      const friday = new Friday();
      this.app = new Server(port, friday).start();
    } catch (e) {
      throw e;
    }
  }

  get = (url: string) => {
    return request(this.app)
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', this.header);
  }

  post = (url: string) => {
    return request(this.app)
      .post(url)
      .set('Accept', 'application/json')
      .set('Authorization', this.header);
  }

  patch = (url: string) => {
    return request(this.app)
      .patch(url)
      .set('Accept', 'application/json')
      .set('Authorization', this.header);
  }

  delete = (url: string) => {
    return request(this.app)
      .delete(url)
      .set('Accept', 'application/json')
      .set('Authorization', this.header);
  }

}
