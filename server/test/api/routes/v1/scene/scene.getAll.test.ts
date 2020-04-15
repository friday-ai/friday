import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import SceneType from '../../../../../src/core/scene/scene.interface';

describe('GET /api/v1/scene', () => {
  it('should return all scenes', async () => {
    await server
      .get('/api/v1/scene')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [{
          id: '2452964a-a225-47dd-9b83-d88d57ed280e',
          name: 'Test scene',
          description: 'A scene for the tests ;) ',
          triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
        },
        ]);
      });
  });

  it('should return all scenes with full scope', async () => {
    await server
      .get('/api/v1/scene')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const scenes = res.body;
        expect(scenes).to.be.an('array');
        scenes.forEach((scene: SceneType) => {
          expect(scene).to.be.an('object');
          expect(scene).to.have.all.keys(
            ['id', 'name', 'description', 'triggerId', 'trigger', 'actions'],
          );
          expect(scene.trigger).to.be.an('object');
          expect(scene.trigger).to.have.all.keys(
            ['id', 'name', 'description', 'type', 'rules'],
          );
          expect(scene.actions).to.be.an('array');
          if (scene.actions != null) {
            scene.actions!.forEach((action) => {
              expect(action).to.have.all.keys(
                ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId'],
              );
            });
          }
        });
      });
  });

  it('should return all scenes with trigger', async () => {
    await server
      .get('/api/v1/scene')
      .query({ scope: 'withTrigger' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const scenes = res.body;
        expect(scenes).to.be.an('array');
        scenes.forEach((scene: SceneType) => {
          expect(scene).to.be.an('object');
          expect(scene).to.have.all.keys(
            ['id', 'name', 'description', 'triggerId', 'trigger'],
          );
          expect(scene.trigger).to.be.an('object');
          expect(scene.trigger).to.have.all.keys(
            ['id', 'name', 'description', 'type', 'rules'],
          );
        });
      });
  });

  it('should return all scenes with actions', async () => {
    await server
      .get('/api/v1/scene')
      .query({ scope: 'withActions' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const scenes = res.body;
        expect(scenes).to.be.an('array');
        scenes.forEach((scene: SceneType) => {
          expect(scene).to.be.an('object');
          expect(scene).to.have.all.keys(
            ['id', 'name', 'description', 'triggerId', 'actions'],
          );
          expect(scene.actions).to.be.an('array');
          if (scene.actions != null) {
            scene.actions!.forEach((action) => {
              expect(action).to.have.all.keys(
                ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId'],
              );
            });
          }
        });
      });
  });
});
