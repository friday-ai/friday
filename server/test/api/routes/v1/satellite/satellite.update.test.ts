import TestServer from "../../../../utils/helper";

describe('satellite.update', () => {
  it('should update a satellite', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .send({
        name: 'Satellite update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Satellite update');
      })
  });

  it('should not found satellite to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894333')
      .send({
        name: 'Satellite update'
      })
      .expect(404);

  });
});
