import { SystemVariablesNames } from "@friday-ai/shared";
import { expect } from "chai";
import { version as packageVersion } from "../../../package.json";
import type Friday from "../../../src/core/friday";

let friday: Friday;

describe("System.getVersion", () => {
  before(async () => {
    friday = global.FRIDAY;
  });

  it("should get friday version", async () => {
    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });

  it("should get friday version even if variable not exist", async () => {
    const variable = await friday.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    await friday.variable.destroy(variable.id || "");

    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });
});
