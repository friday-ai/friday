import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { AvailableState } from '../../../../../src/utils/constants';
import previous from '../../../../../src/core/device/features/media/media.previous';

let friday: Friday;

describe('features.media.previous', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should previous on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      const payload = await previous({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MEDIA_PREVIOUS, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
