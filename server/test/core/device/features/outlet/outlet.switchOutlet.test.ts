import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { AvailableState } from '../../../../../src/utils/constants';
import switchOutlet from '../../../../../src/core/device/features/outlet/outlet.switchOutlet';

let friday: Friday;

describe('features.outlet.switchOutlet', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should switch outlet on an outlet', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('3000d014-dc58-42a3-9b3d-374a2919cf18');

    try {
      const payload = await switchOutlet({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_OUTLET_SWITCH, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not switch outlet on an outlet - Validation error', async () => {
    let message = 'no-error';

    try {
      await switchOutlet({
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
