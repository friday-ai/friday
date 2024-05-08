import events from "node:events";
import type { IncomingMessage } from "node:http";
import net from "node:net";
import Aedes, { type Client, type Connection } from "aedes";

const mqttPort = Number.parseInt(process.env.MQTT_PORT || "1884", 10);

export default class MqttBroker extends events.EventEmitter {
  public broker = new Aedes();
  public client: Client | undefined;

  start() {
    const server = net.createServer(this.broker.handle as (stream: Connection, request?: IncomingMessage) => Client);

    this.broker.on("clientReady", (client) => {
      this.emit("connected", client);
      this.client = client;
    });

    this.broker.on("publish", (packet) => {
      this.emit("message", `${packet.payload}`, packet.topic);
    });

    this.broker.on("subscribe", (subscriptions) => {
      this.emit("subscribe", subscriptions[0].topic);
    });

    server.listen(mqttPort);
  }
}
