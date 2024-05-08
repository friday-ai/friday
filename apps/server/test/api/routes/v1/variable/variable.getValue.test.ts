import { expect } from "chai";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

describe("GET /api/v1/variable/:key", () => {
  it("should return a variable value", async () => {
    await server
      .get("/api/v1/variable")
      .query({
        key: "test_key0",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
        expect(res.body.key).to.equal("test_key0");
      });
  });

  it("admin should have to read a variable value", async () => {
    await server
      .get("/api/v1/variable", admin)
      .query({
        key: "test_key0",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
        expect(res.body.key).to.equal("test_key0");
      });
  });

  it("habitant should have to read a variable value", async () => {
    await server
      .get("/api/v1/variable", habitant)
      .query({
        key: "test_key0",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
        expect(res.body.key).to.equal("test_key0");
      });
  });

  it("guest should't have to read a variable value", async () => {
    await server
      .get("/api/v1/variable", guest)
      .query({
        key: "test_key0",
      })
      .expect("Content-Type", /json/)
      .expect(403);
  });

  it("should not found variable to return", async () => {
    await server
      .get("/api/v1/variable")
      .query({
        key: "key100",
      })
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
