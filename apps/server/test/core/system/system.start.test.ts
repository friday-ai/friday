import { expect } from "chai";
import { FridayMode } from "../../../src/config/constants";
import Friday from "../../../src/core/friday";

describe("System.start", () => {
  it("should start friday system and go to init mode", async function start() {
    this.timeout(8000);

    const friday = new Friday();
    await friday.start();

    expect(friday.mode).to.equal(FridayMode.INIT);
  });
});
