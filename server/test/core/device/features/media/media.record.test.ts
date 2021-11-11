import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { startRecord, stopRecord } from '../../../../../src/core/device/features/media/media.record';
import { AvailableState } from '../../../../../src/utils/constants';

let friday: Friday;

describe('features.media.record', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should start record on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      const payload = await startRecord({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MEDIA_START_RECORD, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should stop record on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      const payload = await stopRecord({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MEDIA_STOP_RECORD, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
