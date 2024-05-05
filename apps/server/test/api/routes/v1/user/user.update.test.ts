import { expect } from "chai";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

describe("PATCH /api/v1/user/:id", () => {
  it("should update a user", async () => {
    await server
      .patch("/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5")
      .send({
        userName: "User update",
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.userName).to.equal("User update");
      });
  });

  it("should not update a user's id", async () => {
    const user = {
      id: "228f118c-be02-4c34-b38e-345a304fd71d",
      userName: "UserName updated but not his id",
    };

    await server
      .patch("/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5")
      .send(user)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(user.id);
        expect(res.body.userName).to.equal(user.userName);
      });
  });

  it("admin should have to update a user", async () => {
    await server
      .patch("/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5", admin)
      .send({
        userName: "User update",
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.userName).to.equal("User update");
      });
  });

  it("habitant shouldn't have to update a user", async () => {
    await server
      .patch("/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5", habitant)
      .send({
        userName: "User update",
      })
      .expect(403);
  });

  it("guest shouldn't have to update a user", async () => {
    await server
      .patch("/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5", guest)
      .send({
        userName: "User update",
      })
      .expect(403);
  });

  it("should not found user to update", async () => {
    await server
      .patch("/api/v1/scene/0cd30aef-9c4e-4a23-81e3-354797129333")
      .send({
        userName: "User update",
      })
      .expect(404);
  });
});
