import { assert, expect } from "chai";
import server from "../../../../utils/request";

describe("POST /api/v1/house", () => {
  it("should create a house", async () => {
    const house = {
      name: "Second House",
      latitude: "34.0012295",
      longitude: "-118.8067245",
    };

    await server
      .post("/api/v1/house")
      .send(house)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an("object");
        assert.deepInclude(res.body, house);
      });
  });

  it("should not create a house with a provided id", async () => {
    const house = {
      id: "228f118c-be02-4c34-b38e-345a304fd71d",
      name: "Random house",
      latitude: "34.0012295",
      longitude: "-118.8067245",
    };

    await server
      .post("/api/v1/house")
      .send(house)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(house.id);
        expect(res.body.name).to.equal("Random house");
      });
  });

  it("should not create a house with an existing name", async () => {
    await server
      .post("/api/v1/house")
      .send({
        id: "d9abed7e-c35b-4a2b-bb6a-5cd2e2ad556e",
        name: "Main House test",
        latitude: "34.0012295",
        longitude: "-118.8067245",
      })
      .expect(409);
  });

  it("should not create a house with an empty name", async () => {
    await server
      .post("/api/v1/house")
      .send({
        id: "d3f40fca-3dd3-45ba-9147-28124d1a5024",
        name: "",
        latitude: "34.0012295",
        longitude: "-118.8067245",
      })
      .expect(422);
  });
});
