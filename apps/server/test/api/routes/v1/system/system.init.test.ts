import { SystemVariablesNames, VariableOwner } from "@friday-ai/shared";
import { expect } from "chai";
import * as database from "../../../../../src/config/database";
import server from "../../../../utils/request";

describe("POST /api/v1/system/init", () => {
  it("should init friday system and go to nominal mode", async function init() {
    this.timeout(8000);

    await database.database.getQueryInterface().bulkDelete("satellite", {});
    await database.database.getQueryInterface().bulkDelete("variable", {});

    await database.database.getQueryInterface().bulkInsert(
      "variable",
      [
        {
          id: "a2b9ba3a-72f1-4a24-b268-e3813c1e8f33",
          key: SystemVariablesNames.HISTORY_STATE_IN_DAYS,
          value: "6 months",
          owner: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
          ownerType: VariableOwner.SATELLITE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await server
      .post("/api/v1/system/init")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it("should not init friday system twice", async () => {
    await server.post("/api/v1/system/init").expect(404);
  });
});
