import { expect } from "chai";
import server from "../../../../utils/request";

describe("PATCH /api/v1/room/:id", () => {
  it("should update a room", async () => {
    await server
      .patch("/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc")
      .send({
        name: "Room update",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("Room update");
      });
  });

  it("should not update a room's id", async () => {
    const room = {
      id: "228f118c-be02-4c34-b38e-345a304fd71d",
      name: "Room's name updated but not his id",
    };

    await server
      .patch("/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc")
      .send(room)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(room.id);
        expect(res.body.name).to.equal(room.name);
      });
  });

  it("should not found room to update", async () => {
    await server
      .patch("/api/v1/room/8b513ecf-2c2d-4cc7-aefc-0ac8eba85333")
      .send({
        name: "Plugin update",
      })
      .expect(404);
  });
});
