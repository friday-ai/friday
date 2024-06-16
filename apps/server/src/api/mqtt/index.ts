import logger from "@friday-ai/logger";
import type { MqttOptions } from "@friday-ai/shared";
import type mqtt from "mqtt";
import { connect } from "mqtt";
import { EventsType, TopicHeaderSub, TopicToSubscribe as Topics } from "../../config/constants";
import type Friday from "../../core/friday";
import handleMessage from "./mqtt.handleMessage";
import sendMessage from "./mqtt.sendMessage";

import MqttHandlers, { type handlerFnType } from "./handlers";

const defaultMqttOptions: MqttOptions = {
  port: 1883,
  host: process.env.MQTT_HOST || "localhost",
  protocol: "mqtt",
  reconnectPeriod: 5000,
};

/**
 * MQTT manager
 * @routePrefix('mqtt')
 */
export default class MqttServer {
  public friday: Friday;
  public MqttClient!: mqtt.MqttClient;
  public sendMessage = sendMessage;
  public handlers: Record<string, handlerFnType> = {};
  public handleMessage = handleMessage;
  public retryTimes = 0;
  public retryInterval: NodeJS.Timeout | null = null;

  constructor(friday: Friday) {
    this.friday = friday;
    this.friday.event.on(EventsType.MQTT_PUBLISH, (event) => this.sendMessage(event));
    this.friday.event.on(EventsType.MQTT_PUBLISH_ALL, (event) => this.sendMessage(event, { sendAll: true }));

    for (const topic of Object.keys(MqttHandlers)) {
      this.handlers[topic] = MqttHandlers[topic];
    }
  }

  async start(mqttOptions?: MqttOptions) {
    const options = mqttOptions ? Object.assign(defaultMqttOptions, mqttOptions) : defaultMqttOptions;

    this.MqttClient = connect(options);

    this.MqttClient.once("connect", () => {
      this.friday.mqttSecret = options;
      logger.info("Connected on mqtt broker");

      logger.info("Subscribing to friday's topics... ");
      for (const topic of Object.values(Topics)) {
        if (typeof topic === "string") {
          this.MqttClient.subscribe(`${TopicHeaderSub}${topic}`);
        }
      }

      this.MqttClient.on("message", (topic, message) => {
        this.handleMessage(topic, message.toString());
      });

      if (this.retryInterval) {
        clearInterval(this.retryInterval);
        this.retryInterval = null;
      }
    });

    this.MqttClient.on("error", (_error) => {
      logger.warning("Error while connecting to MQTT, trying reconnection");
      this.retryTimes += 1;
    });

    this.retryInterval = setInterval(() => {
      // TODO: Send warning to front
      if (this.retryTimes >= 5) {
        this.stop();
        logger.warning("MQTT max reconection limit, stop retry");
      }
    });

    return this.MqttClient;
  }

  stop() {
    if (this.MqttClient) {
      this.MqttClient.end();
      this.MqttClient.removeAllListeners();
      this.retryTimes = 0;
    }
  }
}
