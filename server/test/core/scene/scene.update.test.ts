import { expect, assert } from 'chai';
import Scene from '../../../src/core/scene';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Scene.update', () => {
  const scene = new Scene();

  it('should update a scene', async () => {
    const updatedScene = await scene.update('2452964a-a225-47dd-9b83-d88d57ed280e', {
      id: '2452964a-a225-47dd-9b83-d88d57ed280e',
      name: 'Scene update',
    });

    expect(updatedScene.name).to.equal('Scene update');
  });

  it('should not found scene to update', async () => {
    const promise = scene.update('edfca72c-89bf-4cee-a4b6-fabbef87528a', {
      id: 'edfca72c-89bf-4cee-a4b6-fabbef87528a',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
