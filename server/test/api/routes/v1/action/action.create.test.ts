import { ActionsType } from '../../../../../src/utils/constants';
import TestServer from '../../../../utils/testServer';

describe('action.create', () => {

  it('should return Created', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/action')
      .send({
        id: 'b1ed196e-2754-43f0-8c86-728f043c9c07',
        name: 'action test',
        description: 'action test description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action test variable key',
        variableValue: 'action test variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId', 'updatedAt', 'createdAt']
        );
        expect(
          body.id === 'b1ed196e-2754-43f0-8c86-728f043c9c07' &&
          body.name === 'action test' &&
          body.description === 'action test description' &&
          body.type === ActionsType.LIGHT_TURN_ON &&
          body.subType === '' &&
          body.variableKey === 'action test variable key' &&
          body.variableValue === 'action test variable value' &&
          body.sceneId === '2452964a-a225-47dd-9b83-d88d57ed280e'
        ).toEqual(true);
      });

  });

  it('should not create a action with an existing name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/action')
      .send({
        id: 'b1ed196e-2754-43f0-8c86-728f043c9c07',
        name: 'action test',
        description: 'action test description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action test variable key',
        variableValue: 'action test variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      })
      .expect(409);
  });

  it('should not create a action with an empty name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/action')
      .send({
        id: 'b62c6031-d8cf-4f39-bf99-2b59f7299a00',
        name: '',
        description: 'action test description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action test variable key',
        variableValue: 'action test variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      })
      .expect(422);
  });

  it('should not create a action with an empty scene', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/action')
      .send({
        id: '38f254e5-2779-450f-a931-a80fe38d264f',
        name: 'action test 2',
        description: 'action test description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action test variable key',
        variableValue: 'action test variable value',
        sceneId: ''
      })
      .expect(422);
  });

  it('should not create a action with a wrong scene', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/action')
      .send({
        id: '06ebaef3-f98b-4746-8492-d0c03bf1f33d',
        name: 'action test 3',
        description: 'action test description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action test variable key',
        variableValue: 'action test variable value',
        sceneId: 'bfa8d83b-774b-4203-8a2d-2f738a8a6d0a'
      })
      .expect(422);
  });
});
