import TestServer from "../../../../utils/helper";

describe('action.getAll', () => {
  it('should return all actions', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toEqual(
          {
            id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
            name: 'action1',
            description: 'action1 description',
            type: 'light.turn_on',
            subType: '',
            variableKey: 'action1 variable key',
            variableValue: 'action1 variable value',
            sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
          });
      });
  });

  it('should return an action with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId", "scene"]
        );
        expect(body.scene).toBeObject();
        expect(body.scene).toContainAllKeys(
          ["id", "name", "description", "triggerId"]
        );
      });
  });
});
