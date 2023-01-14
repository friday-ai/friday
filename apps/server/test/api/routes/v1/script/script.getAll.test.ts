import { ScriptAttributes } from '@friday/shared';
import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/script', () => {
  it('should return all script', async () => {
    await server
      .get('/api/v1/script')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((a: ScriptAttributes) => {
          expect(a).to.contains.keys(['id', 'name', 'code']);
        });
      });
  });
});
