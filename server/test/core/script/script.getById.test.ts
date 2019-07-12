import { Script } from '../../../src/core/friday';
import 'jest-extended';

describe('scipt.getById', () => {
  const script = new Script();

  it('should return script', async () => {

    const scriptRetruned = await script.getById('d354cede-3895-4dac-8a90-73d970b4617c');
    expect(scriptRetruned).toEqual(
      {
        id: 'd354cede-3895-4dac-8a90-73d970b4617c',
        name: 'Test Script',
        code: 'console.log(\'Hey ! This script is a test ! :)\')'
      }
    );

  });

});
