import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { AvailableState } from '../../../../../src/config/constants';
import { getMovement, setMovement } from '../../../../../src/core/device/features/camera/camera.movement';

let friday: Friday;

describe('features.camera.movement', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set movement by camera', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('aa88e801-7631-4dab-9ecb-cfc2590dbb78');

    try {
      const payload = await setMovement({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MOVEMENT_DETECTED, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not set movement by camera - Validation error', async () => {
    let message = 'no-error';

    try {
      await setMovement({
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

  it('should get movement from a camera', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('aa88e801-7631-4dab-9ecb-cfc2590dbb78');

    try {
      const payload = await getMovement({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn(AvailableState.DEVICE_MOVEMENT_DETECTED, payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not get movement from a camera - no state', async () => {
    let message = 'no-error';

    try {
      await getMovement({
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
