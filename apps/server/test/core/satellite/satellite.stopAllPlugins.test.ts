import { EventsType } from "@friday-ai/shared";
import { assert, expect } from "chai";
import type { Container } from "dockerode";
import sinon from "sinon";
import type Satellite from "../../../src/core/satellite/satellite";
import { NotFoundError } from "../../../src/utils/decorators/error";

let satellite: Satellite;
let container: Container;

const listenerArgs = {
  type: "plugin.stopped",
  message: { id: "88b48273-15e6-4729-9199-0682677475f4" },
};

describe("Satellite.stopAllPlugins", () => {
  before(async () => {
    satellite = global.FRIDAY.satellite;

    // Create a fake container and save docker id on plugin
    container = await global.FRIDAY.docker.createContainer({
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
    await global.FRIDAY.plugin.update("88b48273-15e6-4729-9199-0682677475f4", {
      dockerId: container.id,
    });
  });

  after(async function after() {
    this.timeout(15000);
    await container.remove({ force: true });
  });

  it("should stop all plugins of a satellite", async function stop() {
    this.timeout(15000);

    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.WEBSOCKET_SEND_ALL, listener);

    const promise = satellite.stopAllPlugins("4801badb-55d7-4bcd-9bf0-37a6cffe0bb1");

    await assert.isFulfilled(promise);
    expect(listener.called).equal(true);
    expect(listener.calledWith(listenerArgs)).to.equal(true);
  });

  it("should not found satellite", async () => {
    const promise = satellite.update("4017c89a-8d02-4d9b-9aec-1e1bcb93a3a7", {});
    await assert.isRejected(promise, NotFoundError);
  });
});
