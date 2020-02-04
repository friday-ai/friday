import TestServer from '../../../../utils/testServer';

describe('script.create', () => {

  it('should create a script', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/script')
      .send({
        id: '9a559e84-6f8f-486c-ae97-e6051b62b7b3',
        name: 'Test Script 2',
        code: 'console.log(\'Hey ! This script is a test ! :)\')'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['id', 'name', 'code', 'updatedAt', 'createdAt']
        );
        expect(
          body.id === '9a559e84-6f8f-486c-ae97-e6051b62b7b3' &&
          body.name === 'Test Script 2' &&
          body.code === 'console.log(\'Hey ! This script is a test ! :)\')'
        ).toEqual(true);
      });

  });

  it('should not create a script with an empty name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/script')
      .send({
        id: 'b9c7b560-8eb6-4d0e-989f-2a2f363590a3',
        name: '',
        code: 'console.log(\'Hey ! This script is a test ! :)\')'
      })
      .expect(422);
  });
});
