import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/action/:id', () => {
  it('should return all actions', async () => {
    await server
      .get('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
          name: 'action1',
          description: 'action1 description',
          type: 'light.turn_on',
          subType: '',
          variableKey: 'action1 variable key',
          variableValue: 'action1 variable value',
          sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
        });
      });
  });

  it('should return an action with full scope', async () => {
    await server
      .get('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(
          ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId', 'scene'],
        );
        expect(res.body.scene).to.contains.keys(
          ['id', 'name', 'description', 'triggerId'],
        );
      });
  });
});
