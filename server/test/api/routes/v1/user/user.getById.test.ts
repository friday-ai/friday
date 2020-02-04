import TestServer from '../../../../utils/testServer';
import VariableType from '../../../../../src/core/variable/variable.interface';

describe('user.getById', () => {
  it('should return user', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let trigger = res.body;
        expect(trigger).toBeObject();
        expect(trigger).toEqual({
          id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
          name: 'Pepperwood',
          firstName: 'John',
          email: 'john@pepperwood.com',
          birthDate: '1997-01-20'
        });
     });
  });

  it('should return user with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'full'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let user = res.body;
        expect(user).toBeObject();
        expect(user).toContainAllKeys(
          ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'state', 'variables']
        );
        if (user.state !== null) {
          expect(user.state).toBeObject();
          expect(user.state).toContainAllKeys(
            ['id', 'owner', 'ownerType', 'value']
          );
        }
        expect(user.variables).toBeArray();
        user.variables!.forEach((variable: VariableType) => {
          expect(variable).toBeObject();
          expect(variable).toContainAllKeys(
            ['id', 'key', 'value', 'owner', 'ownerType']
          );
        });
      });
  });

  it('should return all users with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'withState'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let user = res.body;
        expect(user).toBeObject();
        expect(user).toContainAllKeys(
          ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'state']
        );
        if (user.state !== null) {
          expect(user.state).toBeObject();
          expect(user.state).toContainAllKeys(
            ['id', 'owner', 'ownerType', 'value']
          );
        }
      });
  });

  it('should return all users with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'withVariables'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let user = res.body;
        expect(user).toBeObject();
        expect(user).toContainAllKeys(
          ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'variables']
        );
        expect(user.variables).toBeArray();
        user.variables!.forEach((variable: VariableType) => {
          expect(variable).toBeObject();
          expect(variable).toContainAllKeys(
            ['id', 'key', 'value', 'owner', 'ownerType']
          );
        });
      });
  });
});
