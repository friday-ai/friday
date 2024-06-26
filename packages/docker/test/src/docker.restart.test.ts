import { assert, expect } from "chai";
import Dockerode, { type Container } from "dockerode";
import type Docker from "../../src/index";
import { NotFoundError, PlatformNotCompatible } from "../../src/utils/error";
import wait from "../utils/timer";

let docker: Docker;
let container: Container;

describe("Docker.restart", () => {
  before(async function before() {
    this.timeout(15000);

    docker = global.DOCKER;
    // Override object for tests
    docker.dockerode = new Dockerode();

    container = await docker.createContainer({
      Image: "alpine",
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });
  });

  after(async function a() {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it("should restart a container", async function restart() {
    this.timeout(15000);
    let containerStatus = "";

    const handler = (e: string) => {
      const event = JSON.parse(e);
      containerStatus = event.status;
    };

    if (docker.dockerode) {
      const events = await docker.dockerode.getEvents({ filters: { container: [container.id], type: ["container"] } });
      events.on("data", handler);

      await docker.restart(container.id);
      await wait(1000);

      events.off("data", handler);
      expect(containerStatus).to.equal("restart");
    }
  });

  it("should not restart a container", async () => {
    const promise = docker.restart("71501a8ab0f8");
    await assert.isRejected(promise, NotFoundError);
  });

  it("should not restart a container", async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.restart(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
