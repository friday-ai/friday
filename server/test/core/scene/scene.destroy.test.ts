import Scene from '../../../src/core/scene';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('scene.destoy', () => {
  const scene = new Scene();

  it('should destroy an scene', async () => {
    expect.assertions(0);
    await scene.destroy('2452964a-a225-47dd-9b83-d88d57ed280e');
  });

  it('should not found an scene to destroy', async () => {
    expect.assertions(1);
    await scene.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
