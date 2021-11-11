import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getState, setState } from '../../../../../src/core/device/features/common/common.state';
import { AvailableState } from '../../../../../src/utils/constants';

let friday: Friday;

describe('features.state', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set state on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('2a5ba41e-1a52-4c0a-8c2a-83633cf0d55a');

    try {
      const payload = await setState({
        deviceClass: friday.device,
        deviceType: device,
        state: AvailableState.DEVICE_TRIGGERED,
      });
      testFeatureReturn(AvailableState.DEVICE_TRIGGERED, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get state on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('2a5ba41e-1a52-4c0a-8c2a-83633cf0d55a');

    try {
      const payload = await getState({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_ARMED, payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
