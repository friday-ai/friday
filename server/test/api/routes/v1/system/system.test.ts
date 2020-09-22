import { expect } from 'chai';
import server from '../../../../utils/request';
import System from '../../../../../src/core/system';
import Variable from '../../../../../src/core/variable';
import House from '../../../../../src/core/house';
import Room from '../../../../../src/core/room';
import Satellite from '../../../../../src/core/satellite';
import User from '../../../../../src/core/user';
import Scheduler from '../../../../../src/utils/scheduler';
import Event from '../../../../../src/utils/event';
import * as database from '../../../../../src/config/database';
import jobs from '../../../../../src/config/jobs';

const packageVersion: string = process.env.npm_package_version!;

describe('GET /api/v1/system', () => {
  before(async function before() {
    this.timeout(8000);
    const user = new User();
    const variable = new Variable();
    const room = new Room();
    const satellite = new Satellite();
    const house = new House();
    const event = new Event();
    const scheduler = new Scheduler(event, jobs);
    const system = new System(variable, house, room, satellite, user, scheduler, database);
    await system.init();
  });

  it('should get version of friday', async () => {
    await server
      .get('/api/v1/system')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.equal(packageVersion);
      });
  });
});
