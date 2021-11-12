import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getBattery, setBattery } from '../../../../../src/core/device/features/common/common.battery';

let friday: Friday;

describe('features.battery', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set battery on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('8bb02e82-42fb-43e5-a66a-80a92937547e');

    try {
      const payload = await setBattery({
        deviceClass: friday.device,
        deviceType: device,
        state: 24,
      });
      testFeatureReturn(24, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not set battery on a device - Validation error', async () => {
    let message = 'no-error';

    try {
      await setBattery({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
        state: 24,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('Validation error: Validation notEmpty on owner failed,\nValidation error: Owner not found');
  });

  it('should get battery on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('8bb02e82-42fb-43e5-a66a-80a92937547e');

    try {
      const payload = await getBattery({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn('45', payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not get battery on a device - no state', async () => {
    let message = 'no-error';

    try {
      await getBattery({
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('State not found');
  });
});
