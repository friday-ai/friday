import { expect } from "chai";
import server from "../../../../utils/request";

describe("PATCH /api/v1/trigger/:id", () => {
  it("should update a trigger", async () => {
    await server
      .patch("/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514")
      .send({
        name: "Trigger update",
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.name).to.equal("Trigger update");
      });
  });

  it("should not update a trigger's id", async () => {
    const trigger = {
      id: "228f118c-be02-4c34-b38e-345a304fd71d",
      name: "Trigger's name updated but not his id",
    };

    await server
      .patch("/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514")
      .send(trigger)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(trigger.id);
        expect(res.body.name).to.equal(trigger.name);
      });
  });

  it("should not found trigger to update", async () => {
    await server
      .patch("/api/v1/scene/a0f02b72-73e0-4cfd-a049-5caaa0b8333")
      .send({
        name: "Trigger update",
      })
      .expect(404);
  });
});
