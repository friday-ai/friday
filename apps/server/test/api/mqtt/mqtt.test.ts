import type { MqttOptions } from "@friday-ai/shared";
import { expect } from "chai";
import sinon from "sinon";
import type MqttServer from "../../../src/api/mqtt";
import { EventsType, MqttMessageTypes, TopicHeaderSub, TopicToSubscribe as Topics, TopicsTypes } from "../../../src/config/constants";
import type Friday from "../../../src/core/friday";
import type { MqttMessagePayload } from "../../../src/utils/interfaces";
import type FakeBroker from "../../utils/mqttBroker";
import wait from "../../utils/timer";

const mqttPort = Number.parseInt(process.env.MQTT_PORT || "1884", 10);
const mqttAddress = process.env.MQTT_ADDRESS || "localhost";
const mqttOptions: MqttOptions = {
  port: mqttPort,
  host: mqttAddress,
};

let mqttClient: MqttServer;
let friday: Friday;
let fakeBroker: FakeBroker;

const fakeMsg: MqttMessagePayload = {
  message: "this is a test ;)",
  topic: TopicsTypes.PLUGIN_EXEC,
  type: MqttMessageTypes.MESSAGE_SEND,
  sender: "",
  receiver: "test",
};

describe("Mqtt.connection", () => {
  before(async () => {
    mqttClient = global.MQTT_TEST_SERVER;
    friday = global.FRIDAY;
    fakeBroker = global.FAKE_BROKER;
  });

  it("should connect to MQTT Broker", async () => {
    const listener = sinon.spy();

    fakeBroker.on("connected", listener);
    await mqttClient.start(mqttOptions);
    await wait(40);

    expect(listener.called).equal(true);
    mqttClient.stop();
  });

  it("should not connect to MQTT Broker", async () => {
    const listener = sinon.spy();
    const fakeMqttOptions: MqttOptions = {
      port: 1999,
      host: "localhost",
    };

    const client = await mqttClient.start(fakeMqttOptions);
    client.on("error", listener);

    await wait(30);
    expect(listener.called).equal(true);
    mqttClient.stop();
  });

  it("should subscribe to topics", async () => {
    const topicsSubscribed: Array<string> = [];
    const topicsToSubscribe: Array<string> = [];

    for (const topic of Object.keys(Topics)) {
      if (!Number.isNaN(Number(topic))) {
        topicsToSubscribe.push(`${TopicHeaderSub}${topic}`);
      }
    }

    fakeBroker.on("subscribe", (topic) => {
      topicsSubscribed.push(topic);
    });

    await mqttClient.start(mqttOptions);
    await wait(30);

    expect(topicsSubscribed).deep.equal(topicsToSubscribe);
    mqttClient.stop();
  });
});

describe("Mqtt.publish", () => {
  it("should publish a message", async () => {
    let msgReceived = {};

    await mqttClient.start(mqttOptions);

    fakeBroker.on("message", (message) => {
      msgReceived = { message };
    });

    // Wait until subscribe messages passed
    await wait(30);
    friday.event.emit(EventsType.MQTT_PUBLISH, fakeMsg);
    await wait(30);

    expect(msgReceived).deep.equal({ message: "this is a test ;)" });
    mqttClient.stop();
  });

  it("should not send message", async () => {
    const spy = sinon.spy(mqttClient, "sendMessage");
    await mqttClient.start(mqttOptions);

    const incorrectMsg: MqttMessagePayload = {
      message: "this is a test ;)",
      topic: TopicsTypes.PLUGIN_EXEC,
      type: MqttMessageTypes.MESSAGE_SEND,
      sender: "",
    };

    try {
      // Wait until subscribe messages passed
      await wait(30);
      friday.event.emit(EventsType.MQTT_PUBLISH, incorrectMsg);
      await wait(30);
    } catch (e) {
      return;
    }

    expect(spy.callCount).equal(1);
    expect(spy.threw()).to.equal(true);
    mqttClient.stop();
  });
});

describe("Mqtt.handleMessage", () => {
  after(async () => {
    // Ensure mqtt client is connected after last mqtt test
    global.MQTT_TEST_SERVER.start(mqttOptions);
  });

  it("should handle a message", async () => {
    const spy = sinon.spy(mqttClient, "handleMessage");
    await mqttClient.start(mqttOptions);

    fakeBroker.client?.publish(
      {
        cmd: "publish",
        dup: false,
        qos: 2,
        retain: false,
        payload: Buffer.from("this is a test ;)"),
        topic: TopicsTypes.PLUGIN_EXEC,
      },
      () => null,
    );

    await wait(30);

    expect(spy.calledWith(TopicsTypes.PLUGIN_EXEC, "this is a test ;)")).to.equal(true);
    mqttClient.stop();
  });
});
