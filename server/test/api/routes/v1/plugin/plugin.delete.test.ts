import TestServer from "../../../../utils/helper";

describe('plugin.delete', () => {
  it('should delete a plugin', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found house to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333')
      .expect(404);
  });

});
