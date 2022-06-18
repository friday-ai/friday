import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { AvailableState, StateOwner } from '../../../../../src/config/constants';

describe('POST /api/v1/state', () => {
  it('should create a state', async () => {
    const state = {
      id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    };

    await server
      .post('/api/v1/state')
      .send(state)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, state);
      });
  });

  it('should not create a state with a empty owner id', async () => {
    await server
      .post('/api/v1/state')
      .send({
        id: '658343ba-4d4f-4767-a134-78cc01e7f06c',
        owner: '',
        ownerType: StateOwner.USER,
        value: AvailableState.USER_AT_HOME,
      })
      .expect(422);
  });

  it('should not create a state with a wrong owner id', async () => {
    await server
      .post('/api/v1/state')
      .send({
        id: 'ee688e4d-619c-4938-9189-fc3f21923308',
        owner: '33586095-0d16-4dee-9120-7d77448a803b',
        ownerType: StateOwner.USER,
        value: AvailableState.USER_AT_HOME,
      })
      .expect(422);
  });
});
