import net from 'net';
import MqttStream from 'mqtt-connection';

const mqttPort = parseInt(process.env.MQTT_PORT!, 10) || 1884;

export default class MqtTBroker {
  public isConnected = false;
  public topicsSubscribed: Array<string> = [];
  public broker: MqttStream | undefined;

  start() {
    const server = new net.Server();

    server.on('connection', (stream) => {
      this.broker = new MqttStream(stream);

      // client connected
      this.broker.on('connect', () => {
        // acknowledge the connect packet
        this.broker!.connack({ returnCode: 0 });
        this.isConnected = true;
      });

      // client published
      this.broker.on('publish', (packet) => {
        // send a puback with messageId (for QoS > 0)
        this.broker!.puback({ messageId: packet.messageId });
      });

      // client subscribed
      this.broker.on('subscribe', (packet) => {
        // send a suback with messageId and granted QoS level
        this.broker!.suback({ granted: [packet.qos], messageId: packet.messageId });
        this.topicsSubscribed.push(packet.subscriptions[0].topic);
      });

      // timeout idle streams after 5 minutes
      stream.setTimeout(1000 * 60 * 5);

      // connection error handling
      this.broker.on('close', () => {
        this.broker!.destroy();
      });
      this.broker.on('error', () => {
        this.broker!.destroy();
      });
      this.broker.on('disconnect', () => {
        this.broker!.destroy();
      });

      // stream timeout
      stream.on('timeout', () => {
        this.broker!.destroy();
      });
    });

    server.listen(mqttPort);
  }
}
