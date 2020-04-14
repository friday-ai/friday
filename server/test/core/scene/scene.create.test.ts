import { expect, assert } from 'chai';
import Scene from '../../../src/core/scene';
import { DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('Scene.create', () => {
  const scene = new Scene();

  it('should create a scene', async () => {
    const createdScene = await scene.create({
      id: '46e6a6e2-db6f-4f72-a2e9-4d41c420da33',
      name: 'Test Scene 2',
      description: 'A test to create a scene'
    });

    expect(createdScene).to.have.property('id');
    expect(createdScene).to.have.property('name');
    expect(createdScene).to.have.property('description');
  });

  it('should not create a scene with an empty name', async () => {

    const promise = scene.create({
      id: '0d0b207c-7972-4d79-bf71-b0fc6b6a549e',
      name: '',
      description: 'A test to create a scene'
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

});
