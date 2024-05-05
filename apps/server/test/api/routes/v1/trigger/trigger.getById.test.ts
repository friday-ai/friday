import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/trigger/:id", () => {
  it("should return a trigger", async () => {
    await server
      .get("/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "description", "type", "rules"]);
        expect(res.body.id).to.equal("a0f02b72-73e0-4cfd-a049-5caaa0b80514");
      });
  });

  it("should return a trigger with full scope", async () => {
    await server
      .get("/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514")
      .query({
        scope: "full",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "description", "type", "rules"]);
        expect(res.body.id).to.equal("a0f02b72-73e0-4cfd-a049-5caaa0b80514");

        expect(res.body.scenes).to.be.an("array");

        for (const s of res.body.scenes) {
          expect(s).to.contains.keys(["id", "name", "description", "triggerId"]);
        }
      });
  });
});
