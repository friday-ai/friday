import TestServer from "../../../../utils/helper";

describe('trigger.delete', () => {
  it('should delete a trigger', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found trigger to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80333')
      .expect(404);
  });

});
