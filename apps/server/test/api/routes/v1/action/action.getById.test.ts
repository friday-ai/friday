import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/action/:id', () => {
  it('should return an action', async () => {
    await server
      .get('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']);
        expect(res.body.id).to.equal('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');
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
        expect(res.body).to.contains.keys(['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId', 'scene']);
        expect(res.body.scene).to.contains.keys(['id', 'name', 'description', 'triggerId']);
        expect(res.body.id).to.equal('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');
      });
  });

  it('should not found an action', async () => {
    await server.patch('/api/v1/action/163c08d4-c707-44b9-8ce0-37a45efeb05d').expect(404);
  });
});
