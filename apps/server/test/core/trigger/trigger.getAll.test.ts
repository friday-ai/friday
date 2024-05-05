import { expect } from "chai";
import type Trigger from "../../../src/core/trigger/trigger";

let trigger: Trigger;

describe("Trigger.listAll", () => {
  before(async () => {
    trigger = global.FRIDAY.trigger;
  });

  it("should return all triggers", async () => {
    const triggers = await trigger.listAll();

    expect(triggers).to.be.an("array");

    for (const t of triggers) {
      expect(t).to.contains.keys(["id", "name", "description", "type", "rules"]);
    }
  });

  it("should return all triggers with full scope", async () => {
    const triggers = await trigger.listAll({ scope: "full" });

    expect(triggers).to.be.an("array");

    for (const t of triggers) {
      expect(t).to.contains.keys(["id", "name", "description", "type", "rules"]);

      expect(t.scenes).to.be.an("array");

      for (const s of t.scenes) {
        expect(s).to.contains.keys(["id", "name", "description", "triggerId"]);
      }
    }
  });
});
