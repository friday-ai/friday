/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'mqtt-connection' {
  import { Duplex } from 'stream';
  import * as mqtt from 'mqtt-packet';

  import { EventEmitter } from 'events';

  type ConnectionCallback = () => void;

  interface Connection {
    on(event: 'connack', cb: (packet: mqtt.IConnackPacket) => void): this;
    on(event: 'connect', cb: (packet: mqtt.IConnectPacket) => void): this;
    on(event: 'disconnect', cb: (packet: mqtt.IDisconnectPacket) => void): this;
    on(event: 'pingreq', cb: (packet: mqtt.IPingreqPacket) => void): this;
    on(event: 'pingresp', cb: (packet: mqtt.IPingrespPacket) => void): this;
    on(event: 'puback', cb: (packet: mqtt.IPubackPacket) => void): this;
    on(event: 'pubcomp', cb: (packet: mqtt.IPubcompPacket) => void): this;
    on(event: 'publish', cb: (packet: mqtt.IPublishPacket) => void): this;
    on(event: 'pubrel', cb: (packet: mqtt.IPubrelPacket) => void): this;
    on(event: 'pubrec', cb: (packet: mqtt.IPubrecPacket) => void): this;
    on(event: 'suback', cb: (packet: mqtt.ISubackPacket) => void): this;
    on(event: 'subscribe', cb: (packet: mqtt.ISubscribePacket & mqtt.ISubscription) => void): this;
    on(event: 'unsuback', cb: (packet: mqtt.IUnsubackPacket) => void): this;
    on(event: 'unsubscribe', cb: (packet: mqtt.IUnsubscribePacket) => void): this;

    on(event: 'close', listener: () => void): this;
    on(event: 'error', listener: () => void): this;
    on(event: 'disconnect', listener: () => void): this;
  }

  class Connection extends EventEmitter {
    constructor(duplex?: Duplex, opts?: any | ConnectionCallback, cb?: ConnectionCallback);

    connect(opts: Partial<mqtt.IConnectPacket>, cb?: ConnectionCallback): void;
    connack(opts: Partial<mqtt.IConnackPacket>, cb?: ConnectionCallback): void;
    publish(opts: Partial<mqtt.IPubackPacket>, cb?: ConnectionCallback): void;
    puback(opts: Partial<mqtt.IPubackPacket>, cb?: ConnectionCallback): void;
    pubrec(opts: Partial<mqtt.IPubrecPacket>, cb?: ConnectionCallback): void;
    pubrel(opts: Partial<mqtt.IPubrelPacket>, cb?: ConnectionCallback): void;
    pubcomp(opts: Partial<mqtt.IPubcompPacket>, cb?: ConnectionCallback): void;
    subscribe(opts: Partial<mqtt.ISubscribePacket>, cb?: ConnectionCallback): void;
    suback(opts: Partial<mqtt.ISubackPacket>, cb?: ConnectionCallback): void;
    unsubscribe(opts: Partial<mqtt.IUnsubscribePacket>, cb?: ConnectionCallback): void;
    unsuback(opts: Partial<mqtt.IUnsubackPacket>, cb?: ConnectionCallback): void;
    pingreq(opts: Partial<mqtt.IPingreqPacket>, cb?: ConnectionCallback): void;
    pingresp(opts: Partial<mqtt.IPingrespPacket>, cb?: ConnectionCallback): void;
    disconnect(opts: Partial<mqtt.IDisconnectPacket>, cb?: ConnectionCallback): void;
    auth(opts: any, cb?: ConnectionCallback): void;

    destroy(): void;
    setOptions(opts: any): void;
  }

  export = Connection;
}
