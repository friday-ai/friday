import TestServer from "../../../../utils/helper";

describe('script.getById', () => {
  it('should return one script', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toEqual(
          {
            id: 'd354cede-3895-4dac-8a90-73d970b4617c',
            name: 'Test Script',
            code: 'console.log(\'Hey ! This script is a test ! :)\')'
          });
      });
  });
});
