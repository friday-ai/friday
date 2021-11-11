import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getWarmColdWhite, setWarmColdWhite } from '../../../../../src/core/device/features/light/light.warm-cold-white';
import { AvailableState } from '../../../../../src/utils/constants';

let friday: Friday;

describe('features.light.warmColdWhite', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set warm cold white on a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      const payload = await setWarmColdWhite({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_LIGHT_WARM_COLD_WHITE, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get warm cold white from a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('28500f8d-40d3-4b66-84e2-356fa93c997e');

    await setWarmColdWhite({
      deviceClass: friday.device,
      deviceType: device,
    });

    try {
      const payload = await getWarmColdWhite({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_LIGHT_WARM_COLD_WHITE, payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
