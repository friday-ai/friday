import { Scene } from '../../../src/core/friday';
import { DatabaseValidationError } from '../../../src/utils/error';

describe('scene.create', () => {
  const scene = new Scene();

  it('should create a scene', async () => {
    const createdScene = await scene.create({
      id: '46e6a6e2-db6f-4f72-a2e9-4d41c420da33',
      name: 'Test Scene 2',
      description: 'A test to create a scene'
    });

    expect(createdScene).toHaveProperty('id');
    expect(createdScene).toHaveProperty('name');
    expect(createdScene).toHaveProperty('description');
  });

  it('should not create a scene with an empty name', async () => {

    await scene.create({
      id: '0d0b207c-7972-4d79-bf71-b0fc6b6a549e',
      name: '',
      description: 'A test to create a scene'
    })
      .catch((err) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

});
