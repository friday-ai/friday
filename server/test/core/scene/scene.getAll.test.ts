import { expect, assert } from 'chai';
import Scene from '../../../src/core/scene/scene';

describe('Scene.listAll', () => {
  const scene = new Scene();

  it('should return all scenes', async () => {
    const scenes = await scene.listAll();

    expect(scenes).to.be.an('array');
    assert.deepEqual(scenes, [{
      id: '2452964a-a225-47dd-9b83-d88d57ed280e',
      name: 'Test scene',
      description: 'A scene for the tests ;) ',
      triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
    },
    ]);
  });

  it('should return all scenes with full scope', async () => {
    const scenes = await scene.listAll({ scope: 'full' });

    expect(scenes).to.be.an('array');

    scenes.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('description');
      expect(s).to.have.property('triggerId');

      expect(s.trigger).to.be.an('object');
      expect(s.trigger).to.have.property('id');
      expect(s.trigger).to.have.property('name');
      expect(s.trigger).to.have.property('description');
      expect(s.trigger).to.have.property('type');
      expect(s.trigger).to.have.property('rules');

      expect(s.actions).to.be.an('array');
      if (s.actions != null) {
        s.actions!.forEach((a) => {
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
  });

  it('should return all scenes with trigger', async () => {
    const scenes = await scene.listAll({ scope: 'withTrigger' });

    expect(scenes).to.be.an('array');

    scenes.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('description');
      expect(s).to.have.property('triggerId');

      expect(s.trigger).to.be.an('object');
      expect(s.trigger).to.have.property('id');
      expect(s.trigger).to.have.property('name');
      expect(s.trigger).to.have.property('description');
      expect(s.trigger).to.have.property('type');
      expect(s.trigger).to.have.property('rules');
    });
  });

  it('should return all scenes with actions', async () => {
    const scenes = await scene.listAll({ scope: 'withActions' });

    expect(scenes).to.be.an('array');

    scenes.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('description');
      expect(s).to.have.property('triggerId');

      expect(s.actions).to.be.an('array');
      if (s.actions != null) {
        s.actions!.forEach((a) => {
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
  });
});
