import { assert, expect } from 'chai';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('POST /api/v1/user', () => {
  it('should create a user', async () => {
    const user = {
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
    };

    await server
      .post('/api/v1/user')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, {
          id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
          userName: 'JohnPepperwood',
          email: 'test@test.com',
          theme: 'light',
          language: 'en',
          role: 'habitant',
        });
      });
  });

  it('admin should have to create a user', async () => {
    const user = {
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
    };

    await server
      .post('/api/v1/user', admin)
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, {
          id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
          userName: 'JohnPepperwood',
          email: 'test@test.com',
          theme: 'light',
          language: 'en',
          role: 'habitant',
        });
      });
  });

  it('habitant should\'t have to create a user', async () => {
    const user = {
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
    };

    await server
      .post('/api/v1/user', habitant)
      .send(user)
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('guest should\'t have to create a user', async () => {
    const user = {
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
    };

    await server
      .post('/api/v1/user', guest)
      .send(user)
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('should not create a user with an existing email', async () => {
    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4a23-88e3-3544971296e5',
        userName: 'JohnPepperwood',
        email: 'john@pepperwood.com',
        password: 'mysuperpassword',
        theme: 'light',
      })
      .expect('Content-Type', /json/)
      .expect(409);
  });

  it('should not create user with wrong email', async () => {
    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4c23-88e3-3547971296e5',
        userName: 'JohnPepperwood',
        email: 'johnpepperwood',
        password: 'mysuperpassword',
        theme: 'light',
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create user with password too small', async () => {
    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4c23-89e3-3547971296e5',
        userName: 'JohnPepperwood',
        email: 'test2@test2.com',
        password: 'test',
        theme: 'light',
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create a user with a empty name', async () => {
    await server
      .post('/api/v1/user')
      .send({
        id: 'cab61bee-7ea5-45ee-8932-36b7d6c5520f',
        userName: '',
        email: 'test3@test3.com',
        password: 'mysuperpassword',
        theme: 'light',
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create a user with a empty password', async () => {
    await server
      .post('/api/v1/user')
      .send({
        id: 'c24df82e-4437-46c6-8c9f-be4024469dcd',
        userName: 'JohnPepperwood',
        email: 'test3@test3.com',
        password: '',
        theme: 'light',
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create a user with a empty email', async () => {
    await server
      .post('/api/v1/user')
      .send({
        id: 'f522d4fc-2036-4ef2-8e54-785be7cce5e4',
        userName: 'JohnPepperwood',
        email: '',
        password: 'mysuperpassword',
        theme: 'light',
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
