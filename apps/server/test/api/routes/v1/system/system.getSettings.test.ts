import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/system/settings", () => {
  it("should get settings of friday", async () => {
    await server
      .get("/api/v1/system/settings")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.contains.keys(["version", "units", "history"]);
      });
  });
});
