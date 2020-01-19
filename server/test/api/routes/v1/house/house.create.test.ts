import TestServer from "../../../../utils/helper";

describe('house.create', () => {

  it('should create a house', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/house')
      .send({
        id: '1e7056cf-f449-471c-a1e5-fb2e5ec7261f',
        name: 'Second House',
        latitude: '34.0012295',
        longitude: '-118.8067245'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "name", "latitude", "longitude", "updatedAt", "createdAt"]
        )
        expect(
          body.id === '1e7056cf-f449-471c-a1e5-fb2e5ec7261f' &&
          body.name === 'Second House' &&
          body.latitude === '34.0012295' &&
          body.longitude === '-118.8067245'
        ).toEqual(true);
      });

  });

  it('should not create a house with an existing name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/house')
      .send({
        id: 'd9abed7e-c35b-4a2b-bb6a-5cd2e2ad556e',
        name: 'Main House',
        latitude: '34.0012295',
        longitude: '-118.8067245'
      })
      .expect(409);
  });
});
