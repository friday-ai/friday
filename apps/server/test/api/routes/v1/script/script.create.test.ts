import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/script', () => {
  it('should create a script', async () => {
    const script = {
      name: 'Test Script 2',
      code: "console.log('Hey ! This script is a test ! :)')",
    };

    await server
      .post('/api/v1/script')
      .send(script)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepInclude(res.body, script);
      });
  });

  it('should not create a script with a provided id', async () => {
    const script = {
      id: '0be37223-8bd0-4afc-911d-ac2180017725',
      name: 'Random script',
      code: "console.log('Hey ! This script is a test ! :)')",
    };

    await server
      .post('/api/v1/script')
      .send(script)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.not.equal(script.id);
        expect(res.body.name).to.equal('Random script');
      });
  });

  it('should not create a script with an empty name', async () => {
    await server
      .post('/api/v1/script')
      .send({
        id: 'b9c7b560-8eb6-4d0e-989f-2a2f363590a3',
        name: '',
        code: "console.log('Hey ! This script is a test ! :)')",
      })
      .expect(422);
  });
});
