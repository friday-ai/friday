import TestServer from "../../../../utils/helper";

describe('house.update', () => {
  it('should update a house', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .send({
        name: 'House update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('House update');
      })
  });

  it('should not found house to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc4333')
      .send({
        name: 'House update'
      })
      .expect(404);

  });
});
