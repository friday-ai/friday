import TestServer from "../../../../utils/helper";
import {AvailableState, StateOwner} from "../../../../../src/utils/constants";

describe('state.create', () => {

  it('should create a state', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/state')
      .send({
        id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: StateOwner.USER,
        value: AvailableState.USER_AT_HOME
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "owner", "ownerType", "value", "updatedAt", "createdAt"]
        );
        expect(
          body.id === '9a05e6c3-e36a-4779-bc66-6f7d015920c7' &&
          body.owner === '0cd30aef-9c4e-4a23-81e3-3547971296e5' &&
          body.ownerType === StateOwner.USER &&
          body.value === AvailableState.USER_AT_HOME
        ).toEqual(true);
      });
  });
});
