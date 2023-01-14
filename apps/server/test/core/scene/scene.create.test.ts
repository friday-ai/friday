import { assert } from 'chai';
import Scene from '../../../src/core/scene/scene';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';

let scene: Scene;

describe('Scene.create', () => {
  before(async () => {
    scene = global.FRIDAY.scene;
  });

  it('should create a scene', async () => {
    const sceneToCreate = {
      name: 'Test Scene 2',
      description: 'A test to create a scene',
    };

    const createdScene = await scene.create(sceneToCreate);

    assert.deepInclude(createdScene, sceneToCreate);
  });

  it('should not create a scene with an empty name', async () => {
    const promise = scene.create({
      name: '',
      description: 'A test to create a scene',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
