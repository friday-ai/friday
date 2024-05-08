import { expect } from "chai";
import type House from "../../../src/core/house/house";

let house: House;

describe("House.listAll", () => {
  before(async () => {
    house = global.FRIDAY.house;
  });

  it("should return all houses", async () => {
    const houses = await house.listAll();

    expect(houses).to.be.an("array");

    for (const h of houses) {
      expect(h).to.be.an("object");
      expect(h).to.contains.keys(["id", "name", "latitude", "longitude"]);
    }
  });

  it("should return all houses with full scope", async () => {
    const houses = await house.listAll({ scope: "full" });

    expect(houses).to.be.an("array");

    for (const h of houses) {
      expect(h).to.be.an("object");
      expect(h).to.contains.keys(["id", "name", "latitude", "longitude", "rooms", "state"]);

      expect(h.state).to.be.an("object");
      expect(h.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

      expect(h.rooms).to.be.an("array");

      for (const room of h.rooms) {
        expect(room).to.be.an("object");
        expect(room).to.contains.keys(["id", "name", "houseId"]);
      }
    }
  });

  it("should return all houses with state", async () => {
    const houses = await house.listAll({ scope: "withState" });

    expect(houses).to.be.an("array");

    for (const h of houses) {
      expect(h).to.be.an("object");
      expect(h).to.contains.keys(["id", "name", "latitude", "longitude", "state"]);

      expect(h.state).to.be.an("object");
      expect(h.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
    }
  });

  it("should return all houses with rooms", async () => {
    const houses = await house.listAll({ scope: "withRooms" });

    expect(houses).to.be.an("array");

    for (const h of houses) {
      expect(h).to.be.an("object");
      expect(h).to.contains.keys(["id", "name", "latitude", "longitude", "rooms"]);

      expect(h.rooms).to.be.an("array");

      for (const room of h.rooms) {
        expect(room).to.be.an("object");
        expect(room).to.contains.keys(["id", "name", "houseId"]);
      }
    }
  });
});
