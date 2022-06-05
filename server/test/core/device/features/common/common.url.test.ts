import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import { setUrl, getUrl } from '../../../../../src/core/device/features/common/common.url';

let friday: Friday;

describe('features.url', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set url on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('aa88e801-7631-4dab-9ecb-cfc2590dbb78');

    try {
      await setUrl({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get url on a device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('aa88e801-7631-4dab-9ecb-cfc2590dbb78');

    try {
      await getUrl({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
