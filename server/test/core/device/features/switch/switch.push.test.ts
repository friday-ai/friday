import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { AvailableState } from '../../../../../src/utils/constants';
import push from '../../../../../src/core/device/features/switch/switch.push';

let friday: Friday;

describe('features.switch.push', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should push on a switch', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('b651126b-078c-4e89-b843-b66fa4bd0231');

    try {
      const payload = await push({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_SWITCH_PUSH, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not push on a switch - Validation error', async () => {
    let message = 'no-error';

    try {
      await push({
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
