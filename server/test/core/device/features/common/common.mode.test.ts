import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getMode, setMode } from '../../../../../src/core/device/features/common/common.mode';
import { AvailableState } from '../../../../../src/utils/constants';

let friday: Friday;

describe('features.mode', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set mode on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('4da9c716-de70-43f1-9279-2b088bb90c58');

    try {
      const payload = await setMode({
        deviceClass: friday.device,
        deviceType: device,
        state: AvailableState.DEVICE_PROGRAM,
      });
      testFeatureReturn(AvailableState.DEVICE_PROGRAM, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get mode on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('4da9c716-de70-43f1-9279-2b088bb90c58');

    try {
      const payload = await getMode({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MANUAL, payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
