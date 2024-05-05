import type { PluginInstallAttributes } from "@friday-ai/shared";
import { expect } from "chai";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

const testPlugin: PluginInstallAttributes = {
  name: "Sample-plugin",
  version: "v1.2.0",
  repo: "alpine",
  satelliteId: "a7ef5f08-2bad-4489-95bf-b73fcf894d8f",
  variables: [],
};

let containerId = "";

describe("POST /api/v1/plugin", () => {
  afterEach(async function afterEach() {
    this.timeout(15000);
    if (containerId !== "") {
      const container = await global.FRIDAY.docker.getContainer(containerId);
      await container.remove({ force: true });
      containerId = "";
    }
  });

  it("should install a plugin", async function install() {
    this.timeout(15000);
    await server
      .post("/api/v1/plugin")
      .send(testPlugin)
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an("object");
        expect(res.body.name).to.equal("Sample-plugin");
        containerId = res.body.dockerId;
      });
  });

  it("admin should have access to install a plugin", async function install() {
    this.timeout(15000);
    await server
      .post("/api/v1/plugin", admin)
      .send(testPlugin)
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an("object");
        expect(res.body.name).to.equal("Sample-plugin");
        containerId = res.body.dockerId;
      });
  });

  it("habitant should't have access to install a plugin", async () => {
    await server.post("/api/v1/plugin", habitant).send(testPlugin).expect(403);
  });

  it("guest should't have access to install a plugin", async () => {
    await server.post("/api/v1/plugin", guest).send(testPlugin).expect(403);
  });

  it("should not install a plugin with wrong repo", async () => {
    testPlugin.repo = "fake-plugin:friday";
    await server.post("/api/v1/plugin").send(testPlugin).expect(404);
  });
});
