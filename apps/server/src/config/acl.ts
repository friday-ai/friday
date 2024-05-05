import { UserRole } from "@friday-ai/shared";

export default {
  [UserRole.SUPERADMIN]: {
    grants: [
      {
        resource: "*",
        action: "*",
        attributes: ["*"],
      },
    ],
  },
  [UserRole.ADMIN]: {
    grants: [
      {
        resource: ["*", "!variable"],
        action: "*",
        attributes: ["*"],
      },
      {
        resource: "variable",
        action: ["*", "!create", "!update", "!delete"],
        attributes: ["*"],
      },
    ],
  },
  [UserRole.HABITANT]: {
    grants: [
      {
        resource: ["*", "!variable", "!plugin", "!satellite", "!user"],
        action: "*",
        attributes: ["*"],
      },
      {
        resource: "variable",
        action: ["*", "!create", "!update", "!delete"],
        attributes: ["*"],
      },
      {
        resource: "plugin",
        action: ["read", "create", "login", "!create", "!update", "!delete"],
        attributes: ["*"],
      },
      {
        resource: "satellite",
        action: ["read", "!create", "!update", "!delete"],
        attributes: ["*"],
      },
      {
        resource: "user",
        action: ["*", "!create", "!update", "!delete"],
        attributes: ["*"],
      },
    ],
  },
  [UserRole.GUEST]: {
    grants: [
      {
        resource: "user",
        action: "login",
        attributes: ["*"],
      },
      {
        resource: "action",
        action: "read",
        attributes: ["*"],
      },
      {
        resource: "device",
        action: "read",
        attributes: ["*"],
      },
      {
        resource: "house",
        action: "read",
        attributes: ["*"],
      },
      {
        resource: "room",
        action: "read",
        attributes: ["*"],
      },
      {
        resource: "state",
        action: "read",
        attributes: ["*"],
      },
      {
        resource: "trigger",
        action: "read",
        attributes: ["*"],
      },
    ],
  },
};
