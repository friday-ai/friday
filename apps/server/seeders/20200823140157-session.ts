import type { QueryInterface } from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert("session", [
      {
        id: "894b93df-a7ab-494c-92f6-7d88ae9164b3",
        refreshToken: "e2571d7e042cb5d95fa8714e00b701ef5125b05716414dbc250362d1ad2b14ec", // hash of 'refresh-token-test-simple'
        revoked: false,
        validUntil: new Date(new Date().getTime() + 10000000),
        userId: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "baebcfc9-8ca0-4803-9f56-15519f05eefd",
        refreshToken: "9c10364cd85f88a65cb14093333d6e79781c838f48fec0db6c2992ce866c400c", // hash of 'refresh-token-test-expired'
        revoked: false,
        validUntil: new Date(2017, 13, 1),
        userId: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2c23ba16-a4a0-4015-bb1b-7ecba3375260",
        refreshToken: "284252573756a70dc8e198a8a3eec7fa4105a1596399df3a0e860bd922d2dadd", // hash of 'refresh-token-test-revoked'
        revoked: true,
        validUntil: new Date(new Date().getTime() + 10000000),
        userId: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete("session", {}, {}),
};
