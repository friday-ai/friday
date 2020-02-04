import TestServer from '../../../../utils/testServer';

describe('script.update', () => {
  it('should update a script', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c')
      .send({
        name: 'Script update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Script update');
      });
  });

  it('should not found script to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/scene/d354cede-3895-4dac-8a90-73d970b46333')
      .send({
        name: 'Script update'
      })
      .expect(404);

  });
});
