import TestServer from "../../../../utils/helper";
import {VariableOwner} from "../../../../../src/utils/constants";

describe('variable.create', () => {
  it('should create a variable', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/variable')
      .send({
        id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
        key: 'key_test',
        value: 'value_test',
        owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "key", "value", "owner", "ownerType", "updatedAt", "createdAt"]
        );
        expect(
          body.id === 'a675b2e6-9d1d-40f5-943b-86785e894735' &&
          body.key === 'key_test' &&
          body.value === 'value_test' &&
          body.owner === 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a' &&
          body.ownerType === VariableOwner.USER
        ).toEqual(true);
      });
  });

  it('should not create a variable with an existing key', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/variable')
      .send({
        id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
        key: 'test_key0',
        value: 'value_test',
        owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(409);
  });

  it('should not create variable with wrong owner', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/variable')
      .send({
        id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
        key: 'key_test',
        value: 'value_test',
        owner: '2f5a9f86-2612-436b-9a3b-7040dae16c0d',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create variable with empty key', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/variable')
      .send({
        id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
        key: '',
        value: 'value_test',
        owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create variable with empty value', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/variable')
      .send({
        id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
        key: 'key_test',
        value: '',
        owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
