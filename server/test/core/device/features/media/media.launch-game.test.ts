import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import launchGame from '../../../../../src/core/device/features/media/media.launch-game';

let friday: Friday;

describe('features.media.launchGame', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should launch game on a media', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9c338f0e-6397-4797-9f35-7cf90be6408a');

    try {
      await launchGame({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
