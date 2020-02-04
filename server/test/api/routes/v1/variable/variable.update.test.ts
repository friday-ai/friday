import TestServer from '../../../../utils/testServer';

describe('variable.update', () => {
  it('should update a variable', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32')
      .send({
        value: 'Variable update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.value).toEqual('Variable update');
      });
  });

  it('should not found variable to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8333')
      .send({
        value: 'Variable update'
      })
      .expect(404);

  });
});
