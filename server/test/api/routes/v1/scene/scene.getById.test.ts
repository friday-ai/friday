import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import ActionType from '../../../../../src/core/action/action.interface';

describe('GET /api/v1/scene/:id', () => {
  it('should return one scene', async () => {

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
            id: '2452964a-a225-47dd-9b83-d88d57ed280e',
            name: 'Test scene',
            description: 'A scene for the tests ;) ',
            triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
          });
      });
  });

  it('should return a scene with full scope', async () => {

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scene = res.body;
        expect(scene).to.be.an('object');
        expect(scene).to.have.all.keys(
          ['id', 'name', 'description', 'triggerId', 'trigger', 'actions']
        );
        expect(scene.trigger).to.be.an('object');
        expect(scene.trigger).to.have.all.keys(
          ['id', 'name', 'description', 'type', 'rules']
        );
        expect(scene.actions).to.be.an('array');
        if (scene.actions != null) {
          scene.actions!.forEach((action: ActionType) => {
            expect(action).to.have.all.keys(
              ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']
            );
          });
        }
      });
  });

  it('should return a scene with trigger', async () => {

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({'scope' : 'withTrigger'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scene = res.body;
        expect(scene).to.be.an('object');
        expect(scene).to.have.all.keys(
          ['id', 'name', 'description', 'triggerId', 'trigger']
        );
        expect(scene.trigger).to.be.an('object');
        expect(scene.trigger).to.have.all.keys(
          ['id', 'name', 'description', 'type', 'rules']
        );
      });
  });

  it('should return a scene with actions', async () => {

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({'scope' : 'withActions'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scene = res.body;
        expect(scene).to.be.an('object');
        expect(scene).to.have.all.keys(
          ['id', 'name', 'description', 'triggerId', 'actions']
        );
        expect(scene.actions).to.be.an('array');
        if (scene.actions != null) {
          scene.actions!.forEach((action: ActionType) => {
            expect(action).to.have.all.keys(
              ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']
            );
          });
        }
      });
  });
});
