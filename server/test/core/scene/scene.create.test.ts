import { expect, assert } from 'chai';
import Scene from '../../../src/core/scene/scene';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';

describe('Scene.create', () => {
  const scene = new Scene();

  it('should create a scene', async () => {
    const createdScene = await scene.create({
      name: 'Test Scene 2',
      description: 'A test to create a scene',
    });

    expect(createdScene).to.have.property('id');
    expect(createdScene).to.have.property('name');
    expect(createdScene).to.have.property('description');
  });

  it('should not create a scene with an empty name', async () => {
    const promise = scene.create({
      name: '',
      description: 'A test to create a scene',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
