import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/scene", () => {
  it("should return all scenes", async () => {
    await server
      .get("/api/v1/scene")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const scene of res.body) {
          expect(scene).to.be.an("object");
          expect(scene).to.contains.keys(["id", "name", "description", "triggerId"]);
        }
      });
  });

  it("should return all scenes with full scope", async () => {
    await server
      .get("/api/v1/scene")
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const scene of res.body) {
          expect(scene).to.be.an("object");
          expect(scene).to.contains.keys(["id", "name", "description", "triggerId", "trigger", "actions"]);

          expect(scene.trigger).to.be.an("object");
          expect(scene.trigger).to.contains.keys(["id", "name", "description", "type", "rules"]);

          expect(scene.actions).to.be.an("array");

          for (const action of scene.actions) {
            expect(action).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
          }
        }
      });
  });

  it("should return all scenes with trigger", async () => {
    await server
      .get("/api/v1/scene")
      .query({ scope: "withTrigger" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const scene of res.body) {
          expect(scene).to.be.an("object");
          expect(scene).to.contains.keys(["id", "name", "description", "triggerId", "trigger"]);
          expect(scene.trigger).to.be.an("object");
          expect(scene.trigger).to.contains.keys(["id", "name", "description", "type", "rules"]);
        }
      });
  });

  it("should return all scenes with actions", async () => {
    await server
      .get("/api/v1/scene")
      .query({ scope: "withActions" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const scene of res.body) {
          expect(scene).to.be.an("object");
          expect(scene).to.contains.keys(["id", "name", "description", "triggerId", "actions"]);
          expect(scene.actions).to.be.an("array");

          for (const action of scene.actions) {
            expect(action).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
          }
        }
      });
  });
});
