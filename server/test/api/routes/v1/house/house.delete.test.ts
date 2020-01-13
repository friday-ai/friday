import TestServer from "../../../../utils/helper";

describe('house.delete', () => {
  it('should delete a house', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found house to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc4333')
      .expect(404);
  });

});
