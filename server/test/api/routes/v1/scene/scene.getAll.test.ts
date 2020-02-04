import TestServer from '../../../../utils/testServer';
import SceneType from '../../../../../src/core/scene/scene.interface';

describe('scene.getAll', () => {

  it('should return all scenes', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/scene')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '2452964a-a225-47dd-9b83-d88d57ed280e',
            name: 'Test scene',
            description: 'A scene for the tests ;) ',
            triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
          }
        ]);
      });

  });

  it('should return all scenes with full scope', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/scene')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scenes = res.body;
        expect(scenes).toBeArray();
        scenes.forEach((scene: SceneType) => {
          expect(scene).toBeObject();
          expect(scene).toContainAllKeys(
            ['id', 'name', 'description', 'triggerId', 'trigger', 'actions']
          );
          expect(scene.trigger).toBeObject();
          expect(scene.trigger).toContainAllKeys(
            ['id', 'name', 'description', 'type', 'rules']
          );
          expect(scene.actions).toBeArray();
          if (scene.actions != null) {
            scene.actions!.forEach(action => {
              expect(action).toContainAllKeys(
                ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']
              );
            });
          }
      });
    });
  });

  it('should return all scenes with trigger', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/scene')
      .query({'scope' : 'withTrigger'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scenes = res.body;
        expect(scenes).toBeArray();
        scenes.forEach((scene: SceneType) => {
          expect(scene).toBeObject();
          expect(scene).toContainAllKeys(
            ['id', 'name', 'description', 'triggerId', 'trigger']
          );
          expect(scene.trigger).toBeObject();
          expect(scene.trigger).toContainAllKeys(
            ['id', 'name', 'description', 'type', 'rules']
          );
        });
      });
  });

  it('should return all scenes with actions', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/scene')
      .query({'scope' : 'withActions'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scenes = res.body;
        expect(scenes).toBeArray();
        scenes.forEach((scene: SceneType) => {
          expect(scene).toBeObject();
          expect(scene).toContainAllKeys(
            ['id', 'name', 'description', 'triggerId', 'actions']
          );
          expect(scene.actions).toBeArray();
          if (scene.actions != null) {
            scene.actions!.forEach(action => {
              expect(action).toContainAllKeys(
                ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']
              );
            });
          }
        });
      });
  });
});
