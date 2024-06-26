import { AvailableState, EventsType } from "@friday-ai/shared";
import { assert, expect } from "chai";
import Dockerode, { type Container } from "dockerode";
import sinon from "sinon";
import type Plugin from "../../../src/core/plugin/plugin";
import { NotFoundError } from "../../../src/utils/decorators/error";
import wait from "../../utils/timer";

let plugin: Plugin;
let container: Container;

const listenerArgs = {
  type: "plugin.stopped",
  message: { id: "33ddf1e2-3c51-4426-93af-3b0453ac0c1e" },
};

describe("Plugin.stop", () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
    // Override object for tests
    global.FRIDAY.docker.dockerode = new Dockerode();

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
    await plugin.update("33ddf1e2-3c51-4426-93af-3b0453ac0c1e", {
      dockerId: container.id,
    });
  });

  after(async function after() {
    this.timeout(15000);
    await container.remove({ force: true });
  });

  it("should stop a plugin", async function stop() {
    this.timeout(15000);

    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.WEBSOCKET_SEND_ALL, listener);

    const result = await plugin.stop("33ddf1e2-3c51-4426-93af-3b0453ac0c1e");

    await wait(80);
    expect(result).equal(true);
    expect(listener.called).equal(true);
    expect(listener.calledWith(listenerArgs)).to.equal(true);
  });

  it("should not stop a plugin already stopped", async function stop() {
    this.timeout(15000);
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.WEBSOCKET_SEND_ALL, listener);

    const result = await plugin.stop("33ddf1e2-3c51-4426-93af-3b0453ac0c1e");

    await wait(80);
    expect(result).equal(true);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].type).to.equal(AvailableState.PLUGIN_STOPPED);
  });

  it("should not found a plugin to stop", async () => {
    const promise = plugin.stop("580efda9-6fa1-4bef-865f-d4ef04ea57d6");
    await assert.isRejected(promise, NotFoundError);
  });

  it("should not stop a plugin with wrong docker id", async function stop() {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.WEBSOCKET_SEND_ALL, listener);

    const result = await plugin.stop("88b48273-15e6-4729-9199-0682677475f4");

    await wait(80);
    expect(result).equal(false);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].type).to.equal(AvailableState.PLUGIN_ERRORED);
  });
});
