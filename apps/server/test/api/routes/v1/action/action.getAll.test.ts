import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/action', () => {
  it('should return all actions', async () => {
    await server
      .get('/api/v1/action')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [{
          id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
          name: 'action1',
          description: 'action1 description',
          type: 'light.turn_on',
          subType: '',
          variableKey: 'action1 variable key',
          variableValue: 'action1 variable value',
          sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
        },
        {
          id: '0e7219cf-690d-4224-a29d-dcaf3642c569',
          name: 'action2',
          description: 'action2 description',
          type: 'notification.send',
          subType: '',
          variableKey: 'action2 variable key',
          variableValue: 'action2 variable value',
          sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
        },
        ]);
      });
  });
});
