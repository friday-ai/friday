import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import { AvailableState } from '../../../../../src/utils/constants';
import testFeatureReturn from '../test.feature.return';
import open from '../../../../../src/core/device/features/common/common.open';

let friday: Friday;

describe('features.open', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should open a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('610522d7-7b24-4039-bca8-7e8ae3010129');

    try {
      const payload = await open({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_OPEN_DETECTED, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
