import type Docker from "@friday-ai/docker";
import { expect } from "chai";
import type { Container } from "dockerode";
import type Plugin from "../../../../../src/core/plugin/plugin";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

let plugin: Plugin;
let docker: Docker;
let container: Container;

describe("PATCH /api/v1/satellite/restart/plugins/:id", () => {
  // Create a fake container and save docker id on plugin
  before(async function before() {
    plugin = global.FRIDAY.plugin;
    docker = global.FRIDAY.docker;

    container = await docker.createContainer({
      Image: "alpine",
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });

    await container.start();
  });

  // Only update container id before each hook to prevent multiple useless container created
  beforeEach(async function beforeEach() {
    this.timeout(15000);
    await plugin.update("88b48273-15e6-4729-9199-0682677475f4", {
      dockerId: container.id,
    });
  });

  after(async function after() {
    this.timeout(15000);
    await container.remove({ force: true });
  });

  it("should restart all plugins of a satellite", async function restart() {
    this.timeout(15000);
    await server
      .patch("/api/v1/satellite/restart/plugins/4801badb-55d7-4bcd-9bf0-37a6cffe0bb1")
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it("admin should have access to restart all plugins of a satellite", async function restart() {
    this.timeout(15000);
    await server
      .patch("/api/v1/satellite/restart/plugins/4801badb-55d7-4bcd-9bf0-37a6cffe0bb1", admin)
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });
});

describe("PATCH /api/v1/satellite/restart/plugins/:id", () => {
  it("habitant should't have access to restart all plugins of a satellite", async () => {
    await server.patch("/api/v1/satellite/restart/plugins/4801badb-55d7-4bcd-9bf0-37a6cffe0bb1", habitant).expect(403);
  });

  it("guest should't have access to restart all plugins of a satellite", async () => {
    await server.patch("/api/v1/satellite/restart/plugins/4801badb-55d7-4bcd-9bf0-37a6cffe0bb1", guest).expect(403);
  });

  it("should not found a satellite", async () => {
    await server.patch("/api/v1/satellite/restart/plugins/5801badb-55d7-4bcd-9bf0-37a6cffe0bb1").expect(404);
  });
});
