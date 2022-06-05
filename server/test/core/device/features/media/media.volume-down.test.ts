import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { AvailableState } from '../../../../../src/utils/constants';
import volumeDown from '../../../../../src/core/device/features/media/media.volume-down';

let friday: Friday;

describe('features.media.volumeDown', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should volume down on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      const payload = await volumeDown({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MEDIA_VOLUME_DOWN, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not volume down on a media - Validation error', async () => {
    let message = 'no-error';

    try {
      await volumeDown({
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
