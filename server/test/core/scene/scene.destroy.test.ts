import { assert } from 'chai';
import Scene from '../../../src/core/scene';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Scene.destoy', () => {
  const scene = new Scene();

  it('should destroy an scene', async () => {
    await scene.destroy('2452964a-a225-47dd-9b83-d88d57ed280e');
  });

  it('should not found an scene to destroy', async () => {
    const promise = scene.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });

});
