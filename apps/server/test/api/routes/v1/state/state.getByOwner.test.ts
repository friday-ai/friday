import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/state/:owner", () => {
  it("should return a state of one owner", async () => {
    await server
      .get("/api/v1/state/c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "owner", "ownerType", "value"]);
        expect(res.body.id).to.equal("17ea7282-507b-496b-b496-a6d8ce7fac17");
      });
  });

  it("should not found state", async () => {
    await server.get("/api/v1/state/639cf491-7ff5-4e76-853d-806c81e53f8d").expect(404);
  });
});
