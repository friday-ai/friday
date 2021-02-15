import net from 'net';
import events from 'events';
import Aedes, { Client as AClient } from 'aedes';

const mqttPort = parseInt(process.env.MQTT_PORT!, 10) || 1884;

export default class MqttBroker extends events.EventEmitter {
  public broker = Aedes();
  public client: AClient | undefined;

  start() {
    const server = new net.Server(this.broker.handle);

    this.broker.on('clientReady', (client) => {
      this.emit('connected', client);
      this.client = client;
    });

    this.broker.on('publish', (packet) => {
      this.emit('message', `${packet.payload}`, packet.topic);
    });

    this.broker.on('subscribe', (subscriptions) => {
      this.emit('subscribe', subscriptions[0].topic);
    });

    server.listen(mqttPort);
  }
}
