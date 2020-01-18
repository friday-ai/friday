import TestServer from "../../../../utils/helper";
import UserType from "../../../../../src/core/user/user.interface";

describe('user.getAll', () => {
  it('should return all users', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([{
          id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
          name: 'Pepperwood',
          firstName: 'John',
          email: 'john@pepperwood.com',
          birthDate: '1997-01-20'
        },
          {
            id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
            name: 'Pepperwood',
            firstName: 'Jess',
            email: 'jess@pepperwood.com',
            birthDate: '1997-01-20'
          }]);
      });
  });

  it('should return all users with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user')
      .query({
        scope: "full"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let users = res.body;
        expect(users).toBeArray();
        users!.forEach((user: UserType) => {
          expect(user).toBeObject();
          expect(user).toContainAllKeys(
            ["id", "name", "firstName", "email", "birthDate", "role", "language", "state", "variables"]
          );
          if (user.state !== null) {
            expect(user.state).toBeObject();
            expect(user.state).toContainAllKeys(
              ["id", "owner", "ownerType", "value"]
            );
          }
          expect(user.variables).toBeArray();
          user.variables!.forEach(variable => {
            expect(variable).toBeObject();
            expect(variable).toContainAllKeys(
              ["id", "key", "value", "owner", "ownerType"]
            );
          });
        })
      });
  });

  it('should return all users with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user')
      .query({
        scope: "withState"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let users = res.body;
        expect(users).toBeArray();
        users!.forEach((user: UserType) => {
          expect(user).toBeObject();
          expect(user).toContainAllKeys(
            ["id", "name", "firstName", "email", "birthDate", "role", "language", "state"]
          );
          if (user.state !== null) {
            expect(user.state).toBeObject();
            expect(user.state).toContainAllKeys(
              ["id", "owner", "ownerType", "value"]
            );
          }
        })
      });
  });

  it('should return all users with variables', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user')
      .query({
        scope: "withVariables"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let users = res.body;
        expect(users).toBeArray();
        users!.forEach((user: UserType) => {
          expect(user).toBeObject();
          expect(user).toContainAllKeys(
            ["id", "name", "firstName", "email", "birthDate", "role", "language", "variables"]
          );
          expect(user.variables).toBeArray();
          user.variables!.forEach(variable => {
            expect(variable).toBeObject();
            expect(variable).toContainAllKeys(
              ["id", "key", "value", "owner", "ownerType"]
            );
          });
        })
      });
  });
});
