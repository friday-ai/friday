import TestServer from "../../../../utils/helper";

describe('script.delete', () => {
  it('should delete a script', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found satellite to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/script/d354cede-3895-4dac-8a90-73d970b46333')
      .expect(404);
  });

});
