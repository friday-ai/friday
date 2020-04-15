import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import VariableType from '../../../../../src/core/variable/variable.interface';

describe('GET /api/v1/user/:id', () => {
  it('should return user', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
          name: 'Pepperwood',
          firstName: 'John',
          email: 'john@pepperwood.com',
          birthDate: '1997-01-20',
        });
      });
  });

  it('should return user with full scope', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'full',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const user = res.body;
        expect(user).to.be.an('object');
        expect(user).to.have.all.keys(
          ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'state', 'variables'],
        );
        if (user.state !== null) {
          expect(user.state).to.be.an('object');
          expect(user.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
        expect(user.variables).to.be.an('array');
        user.variables!.forEach((variable: VariableType) => {
          expect(variable).to.be.an('object');
          expect(variable).to.have.all.keys(
            ['id', 'key', 'value', 'owner', 'ownerType'],
          );
        });
      });
  });

  it('should return all users with state', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'withState',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const user = res.body;
        expect(user).to.be.an('object');
        expect(user).to.have.all.keys(
          ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'state'],
        );
        if (user.state !== null) {
          expect(user.state).to.be.an('object');
          expect(user.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
      });
  });

  it('should return all users with state', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'withVariables',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const user = res.body;
        expect(user).to.be.an('object');
        expect(user).to.have.all.keys(
          ['id', 'name', 'firstName', 'email', 'birthDate', 'role', 'language', 'variables'],
        );
        expect(user.variables).to.be.an('array');
        user.variables!.forEach((variable: VariableType) => {
          expect(variable).to.be.an('object');
          expect(variable).to.have.all.keys(
            ['id', 'key', 'value', 'owner', 'ownerType'],
          );
        });
      });
  });
});
