import TestServer from "../../../../utils/helper";

describe('action.delete', () => {
  it('should delete an action', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(true);
      });
  });

  it('should not found action to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1333')
      .expect(404);
  });

});
