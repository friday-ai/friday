import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import getMetadata from '../../../../../src/core/device/features/media/media.metadata';

let friday: Friday;

describe('features.media.getMetadata', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should get metadata on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      await getMetadata({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
