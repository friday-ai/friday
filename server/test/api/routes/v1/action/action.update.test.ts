import TestServer from "../../../../utils/helper";

describe('action.update', () => {
  it('should update an action', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .send({
        name: 'Action update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Action update');
      })
  });

  it('should not found action to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/action/163c08d4-c707-44b9-8ce0-37a45efeb05d')
      .send({
        name: 'Action update'
      })
      .expect(404);

  });
});
