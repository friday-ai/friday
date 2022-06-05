import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import { AvailableState } from '../../../../../src/utils/constants';
import testFeatureReturn from '../test.feature.return';
import close from '../../../../../src/core/device/features/common/common.close';

let friday: Friday;

describe('features.close', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should close on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('610522d7-7b24-4039-bca8-7e8ae3010129');

    try {
      const payload = await close({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_CLOSE_DETECTED, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not close on a device - Validation error', async () => {
    let message = 'no-error';

    try {
      await close({
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
