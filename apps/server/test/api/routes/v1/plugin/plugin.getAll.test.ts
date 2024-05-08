import { expect } from "chai";
import { admin, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

describe("GET /api/v1/plugin", () => {
  it("should return all plugins", async () => {
    await server
      .get("/api/v1/plugin")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys(["id", "name", "dockerId", "version", "url", "enabled", "satelliteId", "lastHeartbeat"]);
        }
      });
  });

  it("should return all plugins with full scope", async () => {
    await server
      .get("/api/v1/plugin")
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys([
            "id",
            "name",
            "dockerId",
            "version",
            "url",
            "enabled",
            "satelliteId",
            "lastHeartbeat",
            "satellite",
            "state",
            "devices",
            "variables",
          ]);

          expect(p.state).to.be.an("object");
          expect(p.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

          expect(p.satellite).to.be.an("object");
          expect(p.satellite).to.contains.keys(["id", "name", "roomId", "lastHeartbeat"]);

          expect(p.variables).to.be.an("array");

          for (const v of p.variables) {
            expect(v).to.be.an("object");
            expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
          }

          expect(p.devices).to.be.an("array");

          for (const d of p.devices) {
            expect(d).to.be.an("object");
            expect(d).to.contains.keys([
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
          }
        }
      });
  });

  it("admin should have to read all plugins with full scope", async () => {
    await server
      .get("/api/v1/plugin", admin)
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys([
            "id",
            "name",
            "dockerId",
            "version",
            "url",
            "enabled",
            "satelliteId",
            "lastHeartbeat",
            "satellite",
            "state",
            "devices",
            "variables",
          ]);

          expect(p.state).to.be.an("object");
          expect(p.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

          expect(p.satellite).to.be.an("object");
          expect(p.satellite).to.contains.keys(["id", "name", "roomId", "lastHeartbeat"]);

          expect(p.variables).to.be.an("array");

          for (const v of p.variables) {
            expect(v).to.be.an("object");
            expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
          }

          expect(p.devices).to.be.an("array");

          for (const d of p.devices) {
            expect(d).to.be.an("object");
            expect(d).to.contains.keys([
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
          }
        }
      });
  });

  it("habitant should have to read all plugins with full scope", async () => {
    await server
      .get("/api/v1/plugin", habitant)
      .query({ scope: "full" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys([
            "id",
            "name",
            "dockerId",
            "version",
            "url",
            "enabled",
            "satelliteId",
            "lastHeartbeat",
            "satellite",
            "state",
            "devices",
            "variables",
          ]);

          expect(p.state).to.be.an("object");
          expect(p.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

          expect(p.satellite).to.be.an("object");
          expect(p.satellite).to.contains.keys(["id", "name", "roomId", "lastHeartbeat"]);

          expect(p.variables).to.be.an("array");

          for (const v of p.variables) {
            expect(v).to.be.an("object");
            expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
          }

          expect(p.devices).to.be.an("array");

          for (const d of p.devices) {
            expect(d).to.be.an("object");
            expect(d).to.contains.keys([
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
          }
        }
      });
  });

  it("should return all plugins with satellites", async () => {
    await server
      .get("/api/v1/plugin")
      .query({ scope: "withSatellite" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys(["id", "name", "dockerId", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "satellite"]);

          expect(p.satellite).to.be.an("object");
          expect(p.satellite).to.contains.keys(["id", "name", "roomId", "lastHeartbeat"]);
        }
      });
  });

  it("should return all plugins with state", async () => {
    await server
      .get("/api/v1/plugin")
      .query({ scope: "withState" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys(["id", "name", "dockerId", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "state"]);

          expect(p.state).to.be.an("object");
          expect(p.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
        }
      });
  });

  it("should return all plugins with devices", async () => {
    await server
      .get("/api/v1/plugin")
      .query({ scope: "withDevices" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys(["id", "name", "dockerId", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "devices"]);

          expect(p.devices).to.be.an("array");

          for (const d of p.devices) {
            expect(d).to.be.an("object");
            expect(d).to.contains.keys([
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
          }
        }
      });
  });

  it("should return all plugins with variables", async () => {
    await server
      .get("/api/v1/plugin")
      .query({ scope: "withVariables" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("array");

        for (const p of res.body) {
          expect(p).to.be.an("object");
          expect(p).to.contains.keys(["id", "name", "dockerId", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "variables"]);

          expect(p.variables).to.be.an("array");

          for (const v of p.variables) {
            expect(v).to.be.an("object");
            expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
          }
        }
      });
  });
});
