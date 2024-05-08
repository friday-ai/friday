import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/house/:id", () => {
  it("should return a house", async () => {
    await server
      .get("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "latitude", "longitude"]);
        expect(res.body.id).to.equal("ecb7958f-ea9e-4520-819e-be6358dc407c");
      });
  });

  it("should return a house with full scope", async () => {
    await server
      .get("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c")
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "latitude", "longitude", "rooms", "state"]);
        expect(res.body.id).to.equal("ecb7958f-ea9e-4520-819e-be6358dc407c");

        expect(res.body.state).to.be.an("object");
        expect(res.body.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

        expect(res.body.rooms).to.be.an("array");

        for (const room of res.body.rooms) {
          expect(room).to.be.an("object");
          expect(room).to.contains.keys(["id", "name", "houseId"]);
        }
      });
  });

  it("should return a house with state", async () => {
    await server
      .get("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c")
      .query({ scope: "withState" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "latitude", "longitude", "state"]);
        expect(res.body.id).to.equal("ecb7958f-ea9e-4520-819e-be6358dc407c");

        expect(res.body.state).to.be.an("object");
        expect(res.body.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
      });
  });

  it("should return a house with rooms", async () => {
    await server
      .get("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c")
      .query({ scope: "withRooms" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "name", "latitude", "longitude", "rooms"]);
        expect(res.body.id).to.equal("ecb7958f-ea9e-4520-819e-be6358dc407c");

        expect(res.body.rooms).to.be.an("array");

        for (const room of res.body.rooms) {
          expect(room).to.be.an("object");
          expect(room).to.contains.keys(["id", "name", "houseId"]);
        }
      });
  });

  it("should not found a housen", async () => {
    await server.patch("/api/v1/house/163c08d4-c707-44b9-8ce0-37a45efeb05d").expect(404);
  });
});
