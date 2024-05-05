import { expect } from "chai";
import server from "../../../../utils/request";

describe("DELETE /api/v1/room/:id", () => {
  it("should delete a room", async () => {
    await server
      .delete("/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc")
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it("should not found room to delete", async () => {
    await server.delete("/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f651333").expect(404);
  });
});
