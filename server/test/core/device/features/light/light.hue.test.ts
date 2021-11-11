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
