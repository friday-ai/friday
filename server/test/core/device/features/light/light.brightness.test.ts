import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getBrightness, setBrightness } from '../../../../../src/core/device/features/light/light.brightness';

let friday: Friday;

describe('features.light.brightness', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set brightness on a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      const payload = await setBrightness({
        deviceClass: friday.device,
        deviceType: device,
        state: 24,
      });
      testFeatureReturn(24, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get brightness from a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('28500f8d-40d3-4b66-84e2-356fa93c997e');

    try {
      const payload = await getBrightness({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn('45', payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
