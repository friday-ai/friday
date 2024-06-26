import { VariableOwner } from "@friday-ai/shared";
import { assert, expect } from "chai";
import { admin, guest, habitant } from "../../../../utils/apiToken";
import server from "../../../../utils/request";

describe("POST /api/v1/variable", () => {
  it("should create a variable", async () => {
    const variable = {
      key: "key_test",
      value: "value_test",
      owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
      ownerType: VariableOwner.USER,
    };

    await server
      .post("/api/v1/variable")
      .send(variable)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an("object");
        assert.deepInclude(res.body, variable);
      });
  });

  it("should not create a variable with a provided id", async () => {
    const variable = {
      id: "a675b2e6-9d1d-40f5-943b-86785e894735",
      key: "random_key",
      value: "value_test",
      owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
      ownerType: VariableOwner.USER,
    };

    await server
      .post("/api/v1/variable")
      .send(variable)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(variable.id);
        expect(res.body.key).to.equal("random_key");
      });
  });

  it("admin should't have to create a variable", async () => {
    const variable = {
      id: "a675b2e6-9d1d-40f5-943b-86785e894735",
      key: "key_test",
      value: "value_test",
      owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
      ownerType: VariableOwner.USER,
    };

    await server.post("/api/v1/variable", admin).send(variable).expect("Content-Type", /json/).expect(403);
  });

  it("habitant should't have to create a variable", async () => {
    const variable = {
      id: "a675b2e6-9d1d-40f5-943b-86785e894735",
      key: "key_test",
      value: "value_test",
      owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
      ownerType: VariableOwner.USER,
    };

    await server.post("/api/v1/variable", habitant).send(variable).expect("Content-Type", /json/).expect(403);
  });

  it("guest should't have to create a variable", async () => {
    const variable = {
      id: "a675b2e6-9d1d-40f5-943b-86785e894735",
      key: "key_test",
      value: "value_test",
      owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
      ownerType: VariableOwner.USER,
    };

    await server.post("/api/v1/variable", guest).send(variable).expect("Content-Type", /json/).expect(403);
  });

  it("should not create a variable with an existing key", async () => {
    await server
      .post("/api/v1/variable")
      .send({
        id: "76c7c070-1cf9-4976-a4b3-9c09ebb75c61",
        key: "test_key0",
        value: "value_test",
        owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
        ownerType: VariableOwner.USER,
      })
      .expect("Content-Type", /json/)
      .expect(409);
  });

  it("should not create variable with wrong owner", async () => {
    await server
      .post("/api/v1/variable")
      .send({
        id: "6f2b2fc6-a2a7-472d-b5bc-8d8be4a1c862",
        key: "key_test1",
        value: "value_test",
        owner: "2f5a9f86-2612-436b-9a3b-7040dae16c0d",
        ownerType: VariableOwner.USER,
      })
      .expect("Content-Type", /json/)
      .expect(422);
  });

  it("should not create variable with empty key", async () => {
    await server
      .post("/api/v1/variable")
      .send({
        id: "5d61444d-34fe-455e-8872-73a3dd823fac",
        key: "",
        value: "value_test",
        owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
        ownerType: VariableOwner.USER,
      })
      .expect("Content-Type", /json/)
      .expect(422);
  });

  it("should not create variable with a empty owner id", async () => {
    await server
      .post("/api/v1/variable")
      .send({
        id: "0aebc362-cdb3-4395-806a-720ff674a1b2",
        key: "key_test3",
        value: "value_key",
        owner: "",
        ownerType: VariableOwner.USER,
      })
      .expect("Content-Type", /json/)
      .expect(422);
  });

  it("should not create variable with empty value", async () => {
    await server
      .post("/api/v1/variable")
      .send({
        id: "a675b2e6-9d1d-40f5-943b-86785e894735",
        key: "key_test4",
        value: "",
        owner: "c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a",
        ownerType: VariableOwner.USER,
      })
      .expect("Content-Type", /json/)
      .expect(422);
  });
});
