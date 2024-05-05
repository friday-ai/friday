import { assert, expect } from "chai";
import Dockerode, { type Container } from "dockerode";
import type Docker from "../../src/index";
import { NotFoundError, PlatformNotCompatible } from "../../src/utils/error";

let docker: Docker;
let container: Container;

describe("Docker.stop", () => {
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

    // Start container for test
    await container.start();
  });

  after((done) => {
    container.remove(done);
  });

  it("should stop a container", async function stop() {
    this.timeout(15000);
    await docker.stop(container.id);
    const containerInfos = await container.inspect();
    expect(containerInfos.State.Status).to.equal("exited");
  });

  it("should not stop a container", async () => {
    const promise = docker.stop("71501a8ab0f8");
    await assert.isRejected(promise, NotFoundError);
  });

  it("should not stop a container", async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.stop(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
