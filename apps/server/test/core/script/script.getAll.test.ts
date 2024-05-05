import { expect } from "chai";
import type Script from "../../../src/core/script/script";

let script: Script;

describe("Script.listAll", () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it("should return all script", async () => {
    const scripts = await script.listAll();

    expect(scripts).to.be.an("array");

    for (const a of scripts) {
      expect(a).to.contains.keys(["id", "name", "code"]);
    }
  });
});
