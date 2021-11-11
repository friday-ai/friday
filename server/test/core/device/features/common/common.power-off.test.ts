import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import powerOff from '../../../../../src/core/device/features/common/common.power-off';
import { AvailableState } from '../../../../../src/utils/constants';
import testFeatureReturn from '../test.feature.return';

let friday: Friday;

describe('features.powerOff', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should power off a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      const payload = await powerOff({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_POWER_OFF, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
