import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getSetpoint, setSetpoint } from '../../../../../src/core/device/features/thermostat/thermostat.setpoint';

let friday: Friday;

describe('features.thermostat.setpoint', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set setpoint on a thermostat', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9f9af769-3086-4e3f-a716-024618c56e01');

    try {
      const payload = await setSetpoint({
        deviceClass: friday.device,
        deviceType: device,
        state: 18,
      });
      testFeatureReturn(18, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not set setpoint on a thermostat - Validation error', async () => {
    let message = 'no-error';

    try {
      await setSetpoint({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
        state: 18,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('Validation error: Validation notEmpty on owner failed,\nValidation error: Owner not found');
  });

  it('should get setpoint from a thermostat', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9f9af769-3086-4e3f-a716-024618c56e01');

    try {
      const payload = await getSetpoint({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn('20', payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not get setpoint from a thermostat - no state', async () => {
    let message = 'no-error';

    try {
      await getSetpoint({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('State not found');
  });
});
