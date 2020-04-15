import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { ActionsType } from '../../../../../src/utils/constants';

describe('POST /api/v1/action', () => {
  it('should return Created', async () => {
    const action = {
      id: 'b1ed196e-2754-43f0-8c86-728f043c9c07',
      name: 'action test',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
    };

    await server
      .post('/api/v1/action')
      .send(action)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, action);
      });
  });

  it('should not create a action with an existing name', async () => {
    await server
      .post('/api/v1/action')
      .send({
        id: 'b1ed196e-2754-43f0-8c86-728f043c9c07',
        name: 'action1',
        description: 'action test description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action test variable key',
        variableValue: 'action test variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
      })
      .expect(409);
  });

  it('should not create a action with an empty name', async () => {
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
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
      })
      .expect(422);
  });

  it('should not create a action with an empty scene', async () => {
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
        sceneId: '',
      })
      .expect(422);
  });

  it('should not create a action with a wrong scene', async () => {
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
        sceneId: 'bfa8d83b-774b-4203-8a2d-2f738a8a6d0a',
      })
      .expect(422);
  });
});
