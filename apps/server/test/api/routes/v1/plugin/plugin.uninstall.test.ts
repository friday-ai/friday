import type Docker from "@friday-ai/docker";
import { expect } from "chai";
import type { Container } from "dockerode";
import type Plugin from "../../../../../src/core/plugin/plugin";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

let plugin: Plugin;
let docker: Docker;
let container: Container;

describe("DELETE /api/v1/plugin/:id", () => {
  // Create a fake container and save docker id on plugin
  beforeEach(async function beforeEach() {
    plugin = global.FRIDAY.plugin;
    docker = global.FRIDAY.docker;

    this.timeout(15000);
    container = await docker.createContainer({
      Image: "alpine",
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });

    await plugin.update("33ddf1e2-3c51-4426-93af-3b0453ac0c1e", {
      dockerId: container.id,
    });
  });

  it("should uninstall a plugin", async () => {
    await server
      .delete("/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e")
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it("admin should have access to uninstall a plugin", async () => {
    await server
      .delete("/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e", admin)
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });
});

describe("DELETE /api/v1/plugin/:id", () => {
  it("habitant should't have access to uninstall a plugin", async () => {
    await server.delete("/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e", habitant).expect(403);
  });

  it("guest should't have access to uninstall a plugin", async () => {
    await server.delete("/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e", guest).expect(403);
  });

  it("should not found plugin to uninstall", async () => {
    await server.delete("/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333").expect(404);
  });
});
