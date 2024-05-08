import { expect } from "chai";
import server from "../../../../utils/request";

describe("POST /api/v1/session/access_token", () => {
  it("should get a access token for an session", async () => {
    await server
      .post("/api/v1/session/access_token")
      .send({
        refreshToken: "refresh-token-test-simple",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");

        expect(res.body).to.contains.keys(["id", "refreshToken", "revoked", "validUntil", "userId", "user"]);
        expect(res.body.revoked).to.equal(false);

        expect(res.body.user).to.be.an("object");
        expect(res.body.user).not.to.have.property("password");
        expect(res.body.user).to.contains.keys(["id", "userName", "email", "theme", "role"]);
      });
  });

  it("should not get a access token for an session", async () => {
    await server
      .post("/api/v1/session/access_token")
      .send({
        refreshToken: "fake-refresh-token-test-simple",
      })
      .expect(404);
  });

  it("should not get a access token for an revoked session", async () => {
    await server
      .post("/api/v1/session/access_token")
      .send({
        refreshToken: "refresh-token-test-revoked",
      })
      .expect(401);
  });

  it("should not get a access token for an expired session", async () => {
    await server
      .post("/api/v1/session/access_token")
      .send({
        refreshToken: "refresh-token-test-expired",
      })
      .expect(401);
  });
});
