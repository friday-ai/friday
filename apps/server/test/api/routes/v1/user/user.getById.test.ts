import { expect } from 'chai';
import { VariableAttributes } from '@friday/shared';
import server from '../../../../utils/request';

describe('GET /api/v1/user/:id', () => {
  it('should return user', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');

        expect(res.body).to.contains.keys(['id', 'userName', 'email', 'theme', 'language', 'role']);
        expect(res.body).to.not.contains.keys(['password']);
        expect(res.body.id).to.equal('0cd30aef-9c4e-4a23-81e3-3547971296e5');
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
        expect(res.body).to.be.an('object');

        expect(res.body).to.contains.keys(['id', 'userName', 'email', 'theme', 'language', 'role', 'state', 'variables']);
        expect(res.body).to.not.contains.keys(['password']);
        expect(res.body.id).to.equal('0cd30aef-9c4e-4a23-81e3-3547971296e5');

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

        expect(res.body.variables).to.be.an('array');
        res.body.variables.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });

  it('should return user with state', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'withState',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');

        expect(res.body).to.contains.keys(['id', 'userName', 'email', 'theme', 'language', 'role', 'state']);
        expect(res.body).to.not.contains.keys(['password']);
        expect(res.body.id).to.equal('0cd30aef-9c4e-4a23-81e3-3547971296e5');

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
      });
  });

  it('should return user with variables', async () => {
    await server
      .get('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .query({
        scope: 'withVariables',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');

        expect(res.body).to.contains.keys(['id', 'userName', 'email', 'theme', 'language', 'role', 'variables']);
        expect(res.body).to.not.contains.keys(['password']);
        expect(res.body.id).to.equal('0cd30aef-9c4e-4a23-81e3-3547971296e5');

        expect(res.body.variables).to.be.an('array');
        res.body.variables.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });
});
