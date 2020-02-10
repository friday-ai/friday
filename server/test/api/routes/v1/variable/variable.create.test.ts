import TestServer from '../../../../utils/testServer';
import { VariableOwner } from '../../../../../src/utils/constants';

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
          ['id', 'key', 'value', 'owner', 'ownerType', 'updatedAt', 'createdAt']
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
        id: '76c7c070-1cf9-4976-a4b3-9c09ebb75c61',
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
        id: '6f2b2fc6-a2a7-472d-b5bc-8d8be4a1c862',
        key: 'key_test1',
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
        id: '5d61444d-34fe-455e-8872-73a3dd823fac',
        key: '',
        value: 'value_test',
        owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create variable with a empty owner id', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/variable')
      .send({
        id: '0aebc362-cdb3-4395-806a-720ff674a1b2',
        key: 'key_test3',
        value: 'value_key',
        owner: '',
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
        key: 'key_test4',
        value: '',
        owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        ownerType: VariableOwner.USER
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
