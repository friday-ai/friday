import { assert } from "chai";
import type Room from "../../../src/core/room/room";
import { NotFoundError } from "../../../src/utils/decorators/error";

let room: Room;

describe("Room.destroy", () => {
  before(async () => {
    room = global.FRIDAY.room;
  });

  it("should destroy an room", async () => {
    await room.destroy("c97ba085-ba97-4a30-bdd3-b7a62f6514dc");
  });

  it("should not found an room to destroy", async () => {
    const promise = room.destroy("a58c31cc-61d2-4c18-b9f6-b8ba8609d12e");
    await assert.isRejected(promise, NotFoundError);
  });
});
