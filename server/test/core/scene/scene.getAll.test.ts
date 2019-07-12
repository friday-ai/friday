import { Scene } from '../../../src/core/friday';
import 'jest-extended';

describe('scene.getAll', () => {
  const scene = new Scene();

  it('should return all scenes', async () => {

    const scenes = await scene.getAll();
    expect(scenes).toEqual([
      {
        id: '2452964a-a225-47dd-9b83-d88d57ed280e',
        name: 'Test scene',
        description: 'A scene for the tests ;) ',
        triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
      }
    ]);

  });

  it('should return all scenes with full scope', async () => {

    const scenes = await scene.getAll({ scope: 'full' });

    expect(scenes).toBeArray();

    scenes.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('description');
      expect(s).toHaveProperty('triggerId');

      expect(s.trigger).toBeObject();
      expect(s.trigger).toHaveProperty('id');
      expect(s.trigger).toHaveProperty('name');
      expect(s.trigger).toHaveProperty('description');
      expect(s.trigger).toHaveProperty('type');
      expect(s.trigger).toHaveProperty('rules');

      expect(s.actions).toBeArray();
      if (s.actions != null) {
        s.actions!.forEach(a => {
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

  it('should return all scenes with trigger', async () => {

    const scenes = await scene.getAll({ scope: 'withTrigger' });

    expect(scenes).toBeArray();

    scenes.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('description');
      expect(s).toHaveProperty('triggerId');

      expect(s.trigger).toBeObject();
      expect(s.trigger).toHaveProperty('id');
      expect(s.trigger).toHaveProperty('name');
      expect(s.trigger).toHaveProperty('description');
      expect(s.trigger).toHaveProperty('type');
      expect(s.trigger).toHaveProperty('rules');

    });

  });

  it('should return all scenes with actions', async () => {

    const scenes = await scene.getAll({ scope: 'withActions' });

    expect(scenes).toBeArray();

    scenes.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('description');
      expect(s).toHaveProperty('triggerId');

      expect(s.actions).toBeArray();
      if (s.actions != null) {
        s.actions!.forEach(a => {
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

});
