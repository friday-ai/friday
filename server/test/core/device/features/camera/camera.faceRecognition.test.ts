import { assert, expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import faceRecognition from '../../../../../src/core/device/features/camera/camera.faceRecognition';

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
        name: 'Pepperwood',
        firstName: 'Jess',
        email: 'jess@pepperwood.com',
        birthDate: '1997-01-20 00:00:00.000 +00:00',
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not recognize user from a camera - Validation error', async () => {
    let message = 'no-error';

    try {
      await faceRecognition({
        userClass: friday.user,
        deviceClass: friday.device,
        deviceType: {
          id: '',
        },
        userId: '',
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('User not found');
  });
});
