import net from 'net';
import MqttStream from 'mqtt-connection';

export default class MqtTBroker {
  public isConnected = false;
  public topicsSubscribed: Array<string> = [];

  start() {
    const server = new net.Server();

    server.on('connection', (stream) => {
      const client = new MqttStream(stream);

      // client connected
      client.on('connect', () => {
        // acknowledge the connect packet
        client.connack({ returnCode: 0 });
        this.isConnected = true;
      });

      // client published
      client.on('publish', (packet) => {
        // send a puback with messageId (for QoS > 0)
        client.puback({ messageId: packet.messageId });
      });

      // client subscribed
      client.on('subscribe', (packet) => {
        // send a suback with messageId and granted QoS level
        client.suback({ granted: [packet.qos], messageId: packet.messageId });
        this.topicsSubscribed.push(packet.subscriptions[0].topic);
      });

      // timeout idle streams after 5 minutes
      stream.setTimeout(1000 * 60 * 5);

      // connection error handling
      client.on('close', () => {
        client.destroy();
      });
      client.on('error', () => {
        client.destroy();
      });
      client.on('disconnect', () => {
        client.destroy();
      });

      // stream timeout
      stream.on('timeout', () => {
        client.destroy();
      });
    });

    server.listen(1884);
  }
}
