import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import unknown from '../../../../../src/core/device/features/unknown/unknown.unknown';

let friday: Friday;

describe('features.unknown.unknown', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should throw an error on an unknown device', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('b651126b-078c-4e89-b843-b66fa4bd0231');

    try {
      await unknown({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('This feature is unknown');
  });
});
