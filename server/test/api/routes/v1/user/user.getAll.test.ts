import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import UserType from '../../../../../src/core/user/user.interface';

describe('GET /api/v1/user', () => {
  it('should return all users', async () => {

    await server
      .get('/api/v1/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [{
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

    await server
      .get('/api/v1/user')
      .query({
        scope: 'full'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let users = res.body;
        expect(users).to.be.an('array');
        users!.forEach((user: UserType) => {
          expect(user).to.be.an('object');
          expect(user).to.have.all.keys(
            ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'state', 'variables']
          );
          if (user.state !== null) {
            expect(user.state).to.be.an('object');
            expect(user.state).to.have.all.keys(
              ['id', 'owner', 'ownerType', 'value']
            );
          }
          expect(user.variables).to.be.an('array');
          user.variables!.forEach(variable => {
            expect(variable).to.be.an('object');
            expect(variable).to.have.all.keys(
              ['id', 'key', 'value', 'owner', 'ownerType']
            );
          });
        });
      });
  });

  it('should return all users with state', async () => {

    await server
      .get('/api/v1/user')
      .query({
        scope: 'withState'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let users = res.body;
        expect(users).to.be.an('array');
        users!.forEach((user: UserType) => {
          expect(user).to.be.an('object');
          expect(user).to.have.all.keys(
            ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'state']
          );
          if (user.state !== null) {
            expect(user.state).to.be.an('object');
            expect(user.state).to.have.all.keys(
              ['id', 'owner', 'ownerType', 'value']
            );
          }
        });
      });
  });

  it('should return all users with variables', async () => {

    await server
      .get('/api/v1/user')
      .query({
        scope: 'withVariables'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let users = res.body;
        expect(users).to.be.an('array');
        users!.forEach((user: UserType) => {
          expect(user).to.be.an('object');
          expect(user).to.have.all.keys(
            ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'variables']
          );
          expect(user.variables).to.be.an('array');
          user.variables!.forEach(variable => {
            expect(variable).to.be.an('object');
            expect(variable).to.have.all.keys(
              ['id', 'key', 'value', 'owner', 'ownerType']
            );
          });
        });
      });
  });
});
