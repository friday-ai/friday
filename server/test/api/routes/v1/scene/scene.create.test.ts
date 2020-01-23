import TestServer from "../../../../utils/helper";

describe('scene.create', () => {

  it('should create a scene', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/scene')
      .send({
        id: '46e6a6e2-db6f-4f72-a2e9-4d41c420da33',
        name: 'Test Scene 2',
        description: 'A test to create a scene'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "name", "description", "updatedAt", "createdAt"]
        )
        expect(
          body.id === '46e6a6e2-db6f-4f72-a2e9-4d41c420da33' &&
          body.name === 'Test Scene 2' &&
          body.description === 'A test to create a scene'
        ).toEqual(true);
      });

  });

  it('should not create a scene with an empty name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/scene')
      .send({
        id: '0d0b207c-7972-4d79-bf71-b0fc6b6a549e',
        name: '',
        description: 'A test to create a scene'
      })
      .expect(422);
  });
});
