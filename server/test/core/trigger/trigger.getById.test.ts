import Trigger from '../../../src/core/trigger';
import 'jest-extended';

describe('trigger.getById', () => {
  const trigger = new Trigger();

  it('should return a trigger', async () => {

    const triggerRetruned = await trigger.getById('a0f02b72-73e0-4cfd-a049-5caaa0b80514');
    expect(triggerRetruned).toEqual(
      {
        id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
        name: 'Test',
        description: 'A trigger test',
        type: 'device.value',
        rules: JSON.stringify({
          device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
          value: '23'
        })
      }
    );

  });

  it('should return a trigger with full scope', async () => {

    const triggerRetruned = await trigger.getById('a0f02b72-73e0-4cfd-a049-5caaa0b80514', 'full');

    expect(triggerRetruned).toEqual(
      {
        id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
        name: 'Test',
        description: 'A trigger test',
        type: 'device.value',
        rules: JSON.stringify({
          device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
          value: '23'
        }),
        scenes: [
          {
            id: '2452964a-a225-47dd-9b83-d88d57ed280e',
            name: 'Test scene',
            description: 'A scene for the tests ;) ',
            triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
          }
        ]
      }
    );

  });

});
