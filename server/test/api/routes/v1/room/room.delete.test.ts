import TestServer from "../../../../utils/helper";

describe('room.delete', () => {
  it('should delete a room', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found room to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f651333')
      .expect(404);
  });

});
