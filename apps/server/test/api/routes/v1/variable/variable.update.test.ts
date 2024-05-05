import { expect } from "chai";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

describe("PATCH /api/v1/variable/:id", () => {
  it("should update a variable with a id", async () => {
    await server
      .patch("/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32")
      .send({
        value: "Variable update",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.value).to.equal("Variable update");
      });
  });

  it("should not update a variable's id", async () => {
    const variable = {
      id: "228f118c-be02-4c34-b38e-345a304fd71d",
      key: "variable's key updated but not his id",
    };

    await server
      .patch("/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32")
      .send(variable)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(variable.id);
        expect(res.body.key).to.equal(variable.key);
      });
  });

  it("admin should't have to update a variable with a id", async () => {
    await server
      .patch("/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32", admin)
      .send({
        value: "Variable update",
      })
      .expect(403);
  });

  it("habitant should't have to update a variable with a id", async () => {
    await server
      .patch("/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32", habitant)
      .send({
        value: "Variable update",
      })
      .expect(403);
  });

  it("guest should't have to update a variable with a id", async () => {
    await server
      .patch("/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32", guest)
      .send({
        value: "Variable update",
      })
      .expect(403);
  });

  it("should update a variable with a key", async () => {
    await server
      .patch("/api/v1/variable/test_key0")
      .send({
        value: "Variable update2",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.value).to.equal("Variable update2");
      });
  });

  it("should not found variable to update", async () => {
    await server
      .patch("/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8333")
      .send({
        value: "Variable update",
      })
      .expect(404);
  });
});
