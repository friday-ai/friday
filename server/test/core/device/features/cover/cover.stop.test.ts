import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import { AvailableState } from '../../../../../src/config/constants';
import testFeatureReturn from '../test.feature.return';
import stop from '../../../../../src/core/device/features/cover/cover.stop';

let friday: Friday;

describe('features.cover.stop', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should stop a cover', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('3103daf1-f545-4d99-bcdd-758799ca4d96');

    try {
      const payload = await stop({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_COVER_STOP, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not stop a cover - Validation error', async () => {
    let message = 'no-error';

    try {
      await stop({
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
