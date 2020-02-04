import TestServer from '../../../../utils/testServer';

describe('action.getAll', () => {

  it('should return all actions', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/action')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
            name: 'action1',
            description: 'action1 description',
            type: 'light.turn_on',
            subType: '',
            variableKey: 'action1 variable key',
            variableValue: 'action1 variable value',
            sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
          },
          {
            id: '0e7219cf-690d-4224-a29d-dcaf3642c569',
            name: 'action2',
            description: 'action2 description',
            type: 'notification.send',
            subType: '',
            variableKey: 'action2 variable key',
            variableValue: 'action2 variable value',
            sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
          }
        ]);
      });

  });

});
