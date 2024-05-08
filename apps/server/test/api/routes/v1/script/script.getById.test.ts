import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/script/:id", () => {
  it("should return one script", async () => {
    await server
      .get("/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "code"]);
        expect(res.body.id).to.equal("d354cede-3895-4dac-8a90-73d970b4617c");
      });
  });
});
