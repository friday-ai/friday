import Script from '../../../src/core/script';
import { DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('script.create', () => {
  const script = new Script();

  it('should create a script', async () => {
    const createdScript = await script.create({
      id: '9a559e84-6f8f-486c-ae97-e6051b62b7b3',
      name: 'Test Script 2',
      code: 'console.log(\'Hey ! This script is a test ! :)\')'
    });

    expect(createdScript).toHaveProperty('id');
    expect(createdScript).toHaveProperty('name');
    expect(createdScript).toHaveProperty('code');
  });

  it('should not create a script with an empty name', async () => {
    expect.assertions(1);

    await script.create({
      id: 'b9c7b560-8eb6-4d0e-989f-2a2f363590a3',
      name: '',
      code: 'console.log(\'Hey ! This script is a test ! :)\')'
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

});
