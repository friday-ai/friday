import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import testFeatureReturn from '../test.feature.return';
import { getHue, setHue } from '../../../../../src/core/device/features/light/light.hue';

let friday: Friday;

describe('features.light.hue', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set hue on a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      const payload = await setHue({
        deviceClass: friday.device,
        deviceType: device,
        rgb: {
          red: 214,
          green: 230,
          blue: 126,
        },
      });
      testFeatureReturn({
        red: 214,
        green: 230,
        blue: 126,
      }, payload);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not set hue on a light params rgb missing', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      await setHue({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('RGB is missing from parameters');
  });

  it('should not set hue on a light - validation error', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      await setHue({
        deviceClass: friday.device,
        deviceType: device,
        rgb: {
          red: parseInt('', 10),
          green: parseInt('', 10),
          blue: parseInt('', 10),
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('Validation error');
  });

  it('should not set hue on a light red not in range', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    try {
      await setHue({
        deviceClass: friday.device,
        deviceType: device,
        rgb: {
          green: 12,
          blue: 10,
          red: 256,
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('The color red must be in this range 0 to 255, actual is 256');
  });

  it('should get hue from a light', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    await setHue({
      deviceClass: friday.device,
      deviceType: device,
      rgb: {
        red: 110,
        green: 18,
        blue: 126,
      },
    });

    try {
      const payload = await getHue({
        deviceClass: friday.device,
        deviceType: device,
      });
      testFeatureReturn({
        red: 110,
        green: 18,
        blue: 126,
      }, payload, 'get');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
