import TestServer from '../../../../utils/testServer';
import { AvailableState, StateOwner } from '../../../../../src/utils/constants';

describe('state.getByOwner', () => {
  it('should return a state of one owner', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/state/c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['id', 'owner', 'ownerType', 'value']
        );
        expect(
          body.id === '17ea7282-507b-496b-b496-a6d8ce7fac17' &&
          body.owner === 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a' &&
          body.ownerType === StateOwner.USER &&
          body.value === AvailableState.USER_AT_HOME
        ).toEqual(true);
      });
  });

  it('should not found state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/state/639cf491-7ff5-4e76-853d-806c81e53f8d')
      .expect(404);
  });
});
