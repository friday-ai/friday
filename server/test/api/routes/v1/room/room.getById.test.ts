import TestServer from "../../../../utils/helper";
import DeviceType from "../../../../../src/core/device/device.interface";
import SatelliteType from "../../../../../src/core/satellite/satellite.interface";

describe('room.getById', () => {
  it('should return a room', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toEqual(
          {
            id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
            name: 'Bedroom',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
          });
      });
  });

  it('should return a room with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let room = res.body;
        expect(room).toBeObject();
        expect(room).toContainAllKeys(
          ["id", "name", "houseId", "house", "devices", "satellites", "state"]
        );
        expect(room.house).toBeObject();
        expect(room.house).toContainAllKeys(
          ["id", "name", "latitude", "longitude"]
        );
        if (room.state !== null) {
          expect(room.state).toBeObject();
          expect(room.state).toContainAllKeys(
            ["id", "owner", "ownerType", "value"]
          );
        }
        if (room.devices !== null) {
          room.devices!.forEach((device: DeviceType) => {
            expect(device).toBeObject();
            expect(device).toContainAllKeys(
              ["id", "name", "type", "subType", "variable", "unit", "value", "roomId", "pluginId"]
            );
          });
        }
        if (room.satellites !== null) {
          expect(room.satellites).toBeArray();
          room.satellites!.forEach((satellite: SatelliteType) => {
            expect(satellite).toBeObject();
            expect(satellite).toContainAllKeys(
              ["id", "name", "roomId"]
            );
          })
        }
      });
  });

  it('should return a room with house', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({'scope' : 'withHouse'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let room = res.body;
        expect(room).toBeObject();
        expect(room).toContainAllKeys(
          ["id", "name", "houseId", "house"]
        );
        expect(room.house).toBeObject();
        expect(room.house).toContainAllKeys(
          ["id", "name", "latitude", "longitude"]
        );
      });
  });

  it('should return a room with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let room = res.body;
        expect(room).toBeObject();
        expect(room).toContainAllKeys(
          ["id", "name", "houseId", "state"]
        );
        if (room.state !== null) {
          expect(room.state).toBeObject();
          expect(room.state).toContainAllKeys(
            ["id", "owner", "ownerType", "value"]
          );
        }
      });
  });

  it('should return a room with devices', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({'scope' : 'withDevices'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let room = res.body;
        expect(room).toBeObject();
        expect(room).toContainAllKeys(
          ["id", "name", "houseId", "devices"]
        );
        if (room.devices !== null) {
          room.devices!.forEach((device: DeviceType) => {
            expect(device).toBeObject();
            expect(device).toContainAllKeys(
              ["id", "name", "type", "subType", "variable", "unit", "value", "roomId", "pluginId"]
            );
          });
        }
      });
  });

  it('should return a room with satellites', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({'scope' : 'withSatellites'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let room = res.body;
        expect(room).toBeObject();
        expect(room).toContainAllKeys(
          ["id", "name", "houseId", "satellites"]
        );
        if (room.satellites !== null) {
          expect(room.satellites).toBeArray();
          room.satellites!.forEach((satellite: SatelliteType) => {
            expect(satellite).toBeObject();
            expect(satellite).toContainAllKeys(
              ["id", "name", "roomId"]
            );
          })
        }
      });
  });
});
