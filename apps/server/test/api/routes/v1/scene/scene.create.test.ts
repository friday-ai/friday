import { assert, expect } from "chai";
import server from "../../../../utils/request";

describe("POST /api/v1/scene", () => {
  it("should create a scene", async () => {
    const scene = {
      name: "Test Scene 2",
      description: "A test to create a scene",
    };

    await server
      .post("/api/v1/scene")
      .send(scene)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an("object");
        assert.deepInclude(res.body, scene);
      });
  });

  it("should not create a scene with a provided id", async () => {
    const scene = {
      id: "5f3863ef-95a8-4395-a65f-2be664f50944",
      name: "Random scene",
      description: "A test to create a scene",
    };

    await server
      .post("/api/v1/scene")
      .send(scene)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(scene.id);
        expect(res.body.name).to.equal("Random scene");
      });
  });

  it("should not create a scene with an empty name", async () => {
    await server
      .post("/api/v1/scene")
      .send({
        id: "0d0b207c-7972-4d79-bf71-b0fc6b6a549e",
        name: "",
        description: "A test to create a scene",
      })
      .expect(422);
  });
});
