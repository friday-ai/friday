import { Scene } from '../../../src/core/friday';
import 'jest-extended';

describe('scene.getById', () => {
  const scene = new Scene();

  it('should return one scene', async () => {

    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e');
    expect(sceneReturned).toEqual({
      id: '2452964a-a225-47dd-9b83-d88d57ed280e',
      name: 'Test scene',
      description: 'A scene for the tests ;) ',
      triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
    });

  });

  it('should return a scene with full scope', async () => {

    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e', 'full' );

    expect(sceneReturned).toBeObject();

    expect(sceneReturned).toHaveProperty('id');
    expect(sceneReturned).toHaveProperty('name');
    expect(sceneReturned).toHaveProperty('description');
    expect(sceneReturned).toHaveProperty('triggerId');

    expect(sceneReturned.trigger).toBeObject();
    expect(sceneReturned.trigger).toHaveProperty('id');
    expect(sceneReturned.trigger).toHaveProperty('name');
    expect(sceneReturned.trigger).toHaveProperty('description');
    expect(sceneReturned.trigger).toHaveProperty('type');
    expect(sceneReturned.trigger).toHaveProperty('rules');

    expect(sceneReturned.actions).toBeArray();
    if (sceneReturned.actions != null) {
      sceneReturned.actions!.forEach(a => {
        expect(a).toHaveProperty('id');
        expect(a).toHaveProperty('name');
        expect(a).toHaveProperty('description');
        expect(a).toHaveProperty('type');
        expect(a).toHaveProperty('subType');
        expect(a).toHaveProperty('variableKey');
        expect(a).toHaveProperty('variableValue');
        expect(a).toHaveProperty('sceneId');
      });
    }

  });

  it('should return a scene with trigger', async () => {

    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e', 'withTrigger' );

    expect(sceneReturned).toBeObject();

    expect(sceneReturned).toHaveProperty('id');
    expect(sceneReturned).toHaveProperty('name');
    expect(sceneReturned).toHaveProperty('description');
    expect(sceneReturned).toHaveProperty('triggerId');

    expect(sceneReturned.trigger).toBeObject();
    expect(sceneReturned.trigger).toHaveProperty('id');
    expect(sceneReturned.trigger).toHaveProperty('name');
    expect(sceneReturned.trigger).toHaveProperty('description');
    expect(sceneReturned.trigger).toHaveProperty('type');
    expect(sceneReturned.trigger).toHaveProperty('rules');

  });

  it('should return a scene with actions', async () => {

    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e', 'withActions' );

    expect(sceneReturned).toBeObject();

    expect(sceneReturned).toHaveProperty('id');
    expect(sceneReturned).toHaveProperty('name');
    expect(sceneReturned).toHaveProperty('description');
    expect(sceneReturned).toHaveProperty('triggerId');

    expect(sceneReturned.actions).toBeArray();
    if (sceneReturned.actions != null) {
      sceneReturned.actions!.forEach(a => {
        expect(a).toHaveProperty('id');
        expect(a).toHaveProperty('name');
        expect(a).toHaveProperty('description');
        expect(a).toHaveProperty('type');
        expect(a).toHaveProperty('subType');
        expect(a).toHaveProperty('variableKey');
        expect(a).toHaveProperty('variableValue');
        expect(a).toHaveProperty('sceneId');
      });
    }

  });

});
