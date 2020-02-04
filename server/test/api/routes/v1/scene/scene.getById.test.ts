import TestServer from "../../../../utils/helper";
import ActionType from "../../../../../src/core/action/action.interface";

describe('scene.getById', () => {
  it('should return one scene', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toEqual(
          {
            id: '2452964a-a225-47dd-9b83-d88d57ed280e',
            name: 'Test scene',
            description: 'A scene for the tests ;) ',
            triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
          });
      });
  });

  it('should return a scene with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scene = res.body;
        expect(scene).toBeObject();
        expect(scene).toContainAllKeys(
          ["id", "name", "description", "triggerId", "trigger", "actions"]
        );
        expect(scene.trigger).toBeObject();
        expect(scene.trigger).toContainAllKeys(
          ["id", "name", "description", "type", "rules"]
        );
        expect(scene.actions).toBeArray();
        if (scene.actions != null) {
          scene.actions!.forEach((action: ActionType) => {
            expect(action).toContainAllKeys(
              ["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]
            );
          });
        }
      });
  });

  it('should return a scene with trigger', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({'scope' : 'withTrigger'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scene = res.body;
        expect(scene).toBeObject();
        expect(scene).toContainAllKeys(
          ["id", "name", "description", "triggerId", "trigger"]
        );
        expect(scene.trigger).toBeObject();
        expect(scene.trigger).toContainAllKeys(
          ["id", "name", "description", "type", "rules"]
        );
      });
  });

  it('should return a scene with actions', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .query({'scope' : 'withActions'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let scene = res.body;
        expect(scene).toBeObject();
        expect(scene).toContainAllKeys(
          ["id", "name", "description", "triggerId", "actions"]
        );
        expect(scene.actions).toBeArray();
        if (scene.actions != null) {
          scene.actions!.forEach((action: ActionType) => {
            expect(action).toContainAllKeys(
              ["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]
            );
          });
        }
      });
  });
});
