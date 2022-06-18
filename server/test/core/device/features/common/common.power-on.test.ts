import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import powerOn from '../../../../../src/core/device/features/common/common.power-on';
import { AvailableState } from '../../../../../src/config/constants';
import testFeatureReturn from '../test.feature.return';

let friday: Friday;

describe('features.powerOn', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should power on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      const payload = await powerOn({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_POWER_ON, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not power on a device - Validation error', async () => {
    let message = 'no-error';

    try {
      await powerOn({
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
