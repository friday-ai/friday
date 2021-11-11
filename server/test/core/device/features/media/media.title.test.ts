import { expect } from 'chai';
import getTitle from '../../../../../src/core/device/features/media/media.title';
import Friday from '../../../../../src/core/friday';

let friday: Friday;

describe('features.media.getTitle', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should get title from a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      await getTitle({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
