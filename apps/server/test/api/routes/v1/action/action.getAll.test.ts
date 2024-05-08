import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/action", () => {
  it("should return all actions", async () => {
    await server
      .get("/api/v1/action")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const a of res.body) {
          expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
        }
      });
  });

  it("should return all actions with full scope", async () => {
    await server
      .get("/api/v1/action")
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const a of res.body) {
          expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId", "scene"]);
          expect(a.scene).to.contains.keys(["id", "name", "description", "triggerId"]);
        }
      });
  });
});
