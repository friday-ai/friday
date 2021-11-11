import { expect } from 'chai';
import pushButton from '../../../../../src/core/device/features/media/media.push-button';
import Friday from '../../../../../src/core/friday';

let friday: Friday;

describe('features.media.pushButton', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should push button on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      await pushButton({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
