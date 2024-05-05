import { expect } from "chai";
import server from "../../../../utils/request";

describe("GET /api/v1/device/:id", () => {
  it("should return a device", async () => {
    await server
      .get("/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal("22b5b9ce-cd9e-404a-8c31-97350d684fd3");
        expect(res.body).to.contains.keys([
          "id",
          "defaultName",
          "defaultManufacturer",
          "defaultModel",
          "name",
          "type",
          "manufacturer",
          "model",
          "externalId",
          "viaDevice",
          "roomId",
          "pluginId",
        ]);
      });
  });

  it("should return a device with full scope", async () => {
    await server
      .get("/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3")
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal("22b5b9ce-cd9e-404a-8c31-97350d684fd3");
        expect(res.body).to.contains.keys([
          "id",
          "defaultName",
          "defaultManufacturer",
          "defaultModel",
          "name",
          "type",
          "manufacturer",
          "model",
          "externalId",
          "viaDevice",
          "roomId",
          "pluginId",
        ]);

        expect(res.body.capabilities).to.be.an("array");

        for (const c of res.body.capabilities) {
          expect(c).to.contains.keys(["id", "defaultName", "name", "type", "deviceId", "roomId"]);
        }
      });
  });

  it("should return a device with capabilities scope (with their settings)", async () => {
    await server
      .get("/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3")
      .query({ scope: "withCapabilities" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.equal("22b5b9ce-cd9e-404a-8c31-97350d684fd3");
        expect(res.body).to.contains.keys([
          "id",
          "defaultName",
          "defaultManufacturer",
          "defaultModel",
          "name",
          "type",
          "manufacturer",
          "model",
          "externalId",
          "viaDevice",
          "roomId",
          "pluginId",
          "capabilities",
        ]);

        expect(res.body.capabilities).to.be.an("array");

        for (const c of res.body.capabilities) {
          expect(c).to.contains.keys(["id", "defaultName", "name", "type", "deviceId", "roomId"]);
          expect(c.settings).to.be.an("object");
        }
      });
  });
});
