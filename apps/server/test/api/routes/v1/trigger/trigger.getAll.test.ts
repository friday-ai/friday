import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/trigger", () => {
  it("should return all triggers", async () => {
    await server
      .get("/api/v1/trigger")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const t of res.body) {
          expect(t).to.contains.keys(["id", "name", "description", "type", "rules"]);
        }
      });
  });

  it("should return all triggers with full scope", async () => {
    await server
      .get("/api/v1/trigger")
      .query({
        scope: "full",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const t of res.body) {
          expect(t).to.contains.keys(["id", "name", "description", "type", "rules"]);
          expect(t.scenes).to.be.an("array");

          for (const s of t.scenes) {
            expect(s).to.contains.keys(["id", "name", "description", "triggerId"]);
          }
        }
      });
  });
});
