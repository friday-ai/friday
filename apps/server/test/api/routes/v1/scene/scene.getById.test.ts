import { ActionAttributes } from '@friday/shared';
import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/scene/:id', () => {
  it('should return one scene', async () => {
    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'description', 'triggerId']);
        expect(res.body.id).to.equal('2452964a-a225-47dd-9b83-d88d57ed280e');
      });
  });

  it('should return a scene with full scope', async () => {
    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'description', 'triggerId', 'trigger', 'actions']);
        expect(res.body.id).to.equal('2452964a-a225-47dd-9b83-d88d57ed280e');

        expect(res.body.trigger).to.be.an('object');
        expect(res.body.trigger).to.contains.keys(['id', 'name', 'description', 'type', 'rules']);

        expect(res.body.actions).to.be.an('array');

        res.body.actions.forEach((action: ActionAttributes) => {
          expect(action).to.contains.keys(['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']);
        });
      });
  });

  it('should return a scene with trigger', async () => {
    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({ scope: 'withTrigger' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'description', 'triggerId', 'trigger']);
        expect(res.body.id).to.equal('2452964a-a225-47dd-9b83-d88d57ed280e');

        expect(res.body.trigger).to.be.an('object');
        expect(res.body.trigger).to.contains.keys(['id', 'name', 'description', 'type', 'rules']);
      });
  });

  it('should return a scene with actions', async () => {
    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({ scope: 'withActions' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'description', 'triggerId', 'actions']);
        expect(res.body.id).to.equal('2452964a-a225-47dd-9b83-d88d57ed280e');

        expect(res.body.actions).to.be.an('array');
        res.body.actions?.forEach((action: ActionAttributes) => {
          expect(action).to.contains.keys(['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']);
        });
      });
  });
});
