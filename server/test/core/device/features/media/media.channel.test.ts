import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getChannel, setChannel } from '../../../../../src/core/device/features/media/media.channel';

let friday: Friday;

describe('features.media.channel', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set channel on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      const payload = await setChannel({
        deviceClass: friday.device,
        deviceType: device,
        state: 1,
      });
      testFeatureReturn(1, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not set channel on a media - Validation error', async () => {
    let message = 'no-error';

    try {
      await setChannel({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
        state: 1,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('Validation error: Validation notEmpty on owner failed,\nValidation error: Owner not found');
  });

  it('should get channel from a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      const payload = await getChannel({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(6, payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not get channel from a media - no state', async () => {
    let message = 'no-error';

    try {
      await getChannel({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('State not found');
  });
});
