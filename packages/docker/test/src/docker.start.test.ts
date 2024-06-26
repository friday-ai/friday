import { assert, expect } from "chai";
import Dockerode, { type Container } from "dockerode";
import type Docker from "../../src/index";
import { NotFoundError, PlatformNotCompatible } from "../../src/utils/error";

let docker: Docker;
let container: Container;

describe("Docker.start", () => {
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

  after(async function after() {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it("should start a container", async function start() {
    this.timeout(15000);
    await docker.start(container.id);
    const containerInfos = await container.inspect();
    expect(containerInfos.State.Status).to.equal("running");
  });

  it("should not start a container", async () => {
    const promise = docker.start("71501a8ab0f8");
    await assert.isRejected(promise, NotFoundError);
  });

  it("should not start a container", async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.start(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
