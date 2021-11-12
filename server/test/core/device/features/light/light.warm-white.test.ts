import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { AvailableState } from '../../../../../src/utils/constants';
import warmWhite from '../../../../../src/core/device/features/light/light.warm-white';

let friday: Friday;

describe('features.light.warmWhite', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set warm white on a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      const payload = await warmWhite({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_LIGHT_WARM_WHITE, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not set warm white on a light - Validation error', async () => {
    let message = 'no-error';

    try {
      await warmWhite({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('Validation error: Validation notEmpty on owner failed,\nValidation error: Owner not found');
  });
});
