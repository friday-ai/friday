import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import { setPlaylist, getPlaylist } from '../../../../../src/core/device/features/media/media.playlist';

let friday: Friday;

describe('features.media.playlist', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set playlist on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      await setPlaylist({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get playlist from a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      await getPlaylist({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
