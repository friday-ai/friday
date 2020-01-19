import TestServer from "../../../../utils/helper";

describe('satellite.create', () => {

  it('should create a satellite', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/satellite')
      .send({
        id: '37225fcb-ff7d-40a7-aacc-ee2a041feebd',
        name: 'Satellite 3',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "name", "roomId", "updatedAt", "createdAt"]
        )
        expect(
          body.id === '37225fcb-ff7d-40a7-aacc-ee2a041feebd' &&
          body.name === 'Satellite 3' &&
          body.roomId === 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
        ).toEqual(true);
      });

  });

  it('should not create a satellite with an empty name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/satellite')
      .send({
        id: '5218d483-d147-4541-bc56-9ad39a105293',
        name: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
      })
      .expect(422);
  });

  it('should not create a satellite  with an empty room', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/satellite')
      .send({
        id: '7e8913ac-5f87-418a-a483-424a9cbcd942',
        name: 'Satellite with an room',
        roomId: ''
      })
      .expect(422);
  });
});
