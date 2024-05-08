import { assert, expect } from "chai";
import type Variable from "../../../src/core/variable/variable";
import { BadParametersError, NotFoundError } from "../../../src/utils/decorators/error";

let variable: Variable;

describe("Variable.getValue", () => {
  before(async () => {
    variable = global.FRIDAY.variable;
  });

  it("should return a variable", async () => {
    const variableReturned = await variable.getValue("test_key0");

    expect(variableReturned).to.be.an("object");
    expect(variableReturned).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
    expect(variableReturned.key).to.equal("test_key0");
  });

  it("should not found variable to return", async () => {
    const promise = variable.getValue("key100");
    await assert.isRejected(promise, NotFoundError);
  });

  it("should not found variable with empty key", async () => {
    const promise = variable.getValue("");
    await assert.isRejected(promise, BadParametersError);
  });
});
