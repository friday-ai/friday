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
});
