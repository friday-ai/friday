import TestServer from '../../../../utils/testServer';

describe('user.create', () => {
  it('should create a user', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
        name: 'Pepperwood',
        firstName: 'John',
        email: 'test@test.com',
        password: 'mysuperpassword',
        birthDate: new Date(1996, 12, 20)
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['role', 'language', 'id', 'name', 'firstName', 'email', 'birthDate', 'updatedAt', 'createdAt']
        );
        expect(
          body.id === '0cd30aef-9c4e-4a23-88e3-3547971296e5' &&
          body.name === 'Pepperwood' &&
          body.firstName === 'John' &&
          body.email === 'test@test.com' &&
          body.birthDate === '1997-01-20'
        ).toEqual(true);
        expect(body).not.toHaveProperty('password');
      });
  });

  it('should not create a user with an existing email', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4a23-88e3-3544971296e5',
        name: 'Pepperwood',
        firstName: 'John',
        email: 'john@pepperwood.com',
        password: 'mysuperpassword',
        birthDate: new Date(1996, 12, 20)
      })
      .expect('Content-Type', /json/)
      .expect(409);
  });

  it('should not create user with wrong email', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4c23-88e3-3547971296e5',
        name: 'Pepperwood',
        firstName: 'John',
        email: 'johnpepperwood',
        password: 'mysuperpassword',
        birthDate: new Date(1996, 12, 20)
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not create user with password too small', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/user')
      .send({
        id: '0cd30aef-9c4e-4c23-89e3-3547971296e5',
        name: 'Pepperwood',
        firstName: 'John',
        email: 'john@pepperwood.com',
        password: 'test',
        birthDate: new Date(1996, 12, 20)
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
