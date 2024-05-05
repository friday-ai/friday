import { expect } from "chai";
import server from "../../../../utils/request";

describe("PATCH /api/v1/house/:id", () => {
  it("should update a house", async () => {
    await server
      .patch("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c")
      .send({
        name: "House update",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal("ecb7958f-ea9e-4520-819e-be6358dc407c");
        expect(res.body.name).to.equal("House update");
      });
  });

  it("should not update a house's id", async () => {
    const house = {
      id: "228f118c-be02-4c34-b38e-345a304fd71d",
      name: "House's name updated but not his id",
    };

    await server
      .patch("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c")
      .send(house)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(house.id);
        expect(res.body.name).to.equal(house.name);
      });
  });

  it("should not found house to update", async () => {
    await server
      .patch("/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc4333")
      .send({
        name: "House update",
      })
      .expect(404);
  });
});
