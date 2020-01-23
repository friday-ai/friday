import TestServer from "../../../../utils/helper";

describe('script.getAll', () => {

  it('should return all script', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/script')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 'd354cede-3895-4dac-8a90-73d970b4617c',
            name: 'Test Script',
            code: 'console.log(\'Hey ! This script is a test ! :)\')'
          }
        ]);
      });
  });
});
