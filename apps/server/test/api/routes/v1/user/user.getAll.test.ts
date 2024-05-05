import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/user", () => {
  it("should return all users", async () => {
    await server
      .get("/api/v1/user")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const u of res.body) {
          expect(u).to.contains.keys(["id", "userName", "email", "theme", "language", "role"]);
          expect(u).to.not.contains.keys(["password"]);
        }
      });
  });

  it("should return all users with full scope", async () => {
    await server
      .get("/api/v1/user")
      .query({
        scope: "full",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const u of res.body) {
          expect(u).to.contains.keys(["id", "userName", "email", "theme", "language", "role", "state", "variables"]);
          expect(u).to.not.contains.keys(["password"]);

          expect(u.state).to.be.an("object");
          expect(u.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

          expect(u.variables).to.be.an("array");

          for (const v of u.variables) {
            expect(v).to.be.an("object");
            expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
          }
        }
      });
  });

  it("should return all users with state", async () => {
    await server
      .get("/api/v1/user")
      .query({
        scope: "withState",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const u of res.body) {
          expect(u).to.contains.keys(["id", "userName", "email", "theme", "language", "role", "state"]);
          expect(u).to.not.contains.keys(["password"]);

          expect(u.state).to.be.an("object");
          expect(u.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
        }
      });
  });

  it("should return all users with variables", async () => {
    await server
      .get("/api/v1/user")
      .query({
        scope: "withVariables",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const u of res.body) {
          expect(u).to.contains.keys(["id", "userName", "email", "theme", "language", "role", "variables"]);
          expect(u).to.not.contains.keys(["password"]);

          expect(u.variables).to.be.an("array");

          for (const v of u.variables) {
            expect(v).to.be.an("object");
            expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
          }
        }
      });
  });
});
