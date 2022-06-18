import { expect, assert } from 'chai';
import Scene from '../../../src/core/scene/scene';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('Scene.getById', () => {
  const scene = new Scene();

  it('should return one scene', async () => {
    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e');

    expect(sceneReturned).to.be.an('object');
    assert.deepEqual(sceneReturned, {
      id: '2452964a-a225-47dd-9b83-d88d57ed280e',
      name: 'Test scene',
      description: 'A scene for the tests ;) ',
      triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
    });
  });

  it('should return a scene with full scope', async () => {
    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e', 'full');

    expect(sceneReturned).to.be.an('object');

    expect(sceneReturned).to.have.property('id');
    expect(sceneReturned).to.have.property('name');
    expect(sceneReturned).to.have.property('description');
    expect(sceneReturned).to.have.property('triggerId');

    expect(sceneReturned.trigger).to.be.an('object');
    expect(sceneReturned.trigger).to.have.property('id');
    expect(sceneReturned.trigger).to.have.property('name');
    expect(sceneReturned.trigger).to.have.property('description');
    expect(sceneReturned.trigger).to.have.property('type');
    expect(sceneReturned.trigger).to.have.property('rules');

    expect(sceneReturned.actions).to.be.an('array');
    if (sceneReturned.actions != null) {
      sceneReturned.actions!.forEach((a) => {
        expect(a).to.have.property('id');
        expect(a).to.have.property('name');
        expect(a).to.have.property('description');
        expect(a).to.have.property('type');
        expect(a).to.have.property('subType');
        expect(a).to.have.property('variableKey');
        expect(a).to.have.property('variableValue');
        expect(a).to.have.property('sceneId');
      });
    }
  });

  it('should return a scene with trigger', async () => {
    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e', 'withTrigger');

    expect(sceneReturned).to.be.an('object');

    expect(sceneReturned).to.have.property('id');
    expect(sceneReturned).to.have.property('name');
    expect(sceneReturned).to.have.property('description');
    expect(sceneReturned).to.have.property('triggerId');

    expect(sceneReturned.trigger).to.be.an('object');
    expect(sceneReturned.trigger).to.have.property('id');
    expect(sceneReturned.trigger).to.have.property('name');
    expect(sceneReturned.trigger).to.have.property('description');
    expect(sceneReturned.trigger).to.have.property('type');
    expect(sceneReturned.trigger).to.have.property('rules');
  });

  it('should return a scene with actions', async () => {
    const sceneReturned = await scene.getById('2452964a-a225-47dd-9b83-d88d57ed280e', 'withActions');

    expect(sceneReturned).to.be.an('object');

    expect(sceneReturned).to.have.property('id');
    expect(sceneReturned).to.have.property('name');
    expect(sceneReturned).to.have.property('description');
    expect(sceneReturned).to.have.property('triggerId');

    expect(sceneReturned.actions).to.be.an('array');
    if (sceneReturned.actions != null) {
      sceneReturned.actions!.forEach((a) => {
        expect(a).to.have.property('id');
        expect(a).to.have.property('name');
        expect(a).to.have.property('description');
        expect(a).to.have.property('type');
        expect(a).to.have.property('subType');
        expect(a).to.have.property('variableKey');
        expect(a).to.have.property('variableValue');
        expect(a).to.have.property('sceneId');
      });
    }
  });

  it('should not found a scene', async () => {
    const promise = scene.getById('edfca72c-87bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
