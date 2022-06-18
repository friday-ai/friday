import { assert, expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import faceRecognition from '../../../../../src/core/device/features/camera/camera.faceRecognition';
import { UserRole } from '../../../../../src/config/constants';
import { NotFoundError } from '../../../../../src/utils/decorators/error';

let friday: Friday;

describe('features.camera.faceRecognition', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should recognize user from a camera', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('aa88e801-7631-4dab-9ecb-cfc2590dbb78');

    try {
      const payload = await faceRecognition({
        userClass: friday.user,
        deviceClass: friday.device,
        deviceType: device,
        userId: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      });

      expect(payload).to.be.an('object');

      assert.deepEqual(payload, {
        id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        userName: 'JessPepperwood',
        email: 'jess@pepperwood.com',
        theme: 'light',
        role: UserRole.HABITANT,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not recognize user from a camera - Validation error', async () => {
    const promise = faceRecognition({
      userClass: friday.user,
      deviceClass: friday.device,
      deviceType: {
        id: '',
      },
      userId: '',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
