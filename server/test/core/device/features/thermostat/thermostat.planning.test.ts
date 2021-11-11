import { expect } from 'chai';
import Friday from '../../../../../src/core/friday';
import { setPlanning, getplanning } from '../../../../../src/core/device/features/thermostat/thermostat.planning';

let friday: Friday;

describe('features.thermostat.planning', () => {
  before(async () => {
    // @ts-ignore
    friday = global.FRIDAY;
  });

  it('should set planning on a thermostat', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9f9af769-3086-4e3f-a716-024618c56e01');

    try {
      await setPlanning({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should get planning from a thermostat', async () => {
    let message = 'no-error';
    const device = await friday.device.getById('9f9af769-3086-4e3f-a716-024618c56e01');

    try {
      await getplanning({
        deviceClass: friday.device,
        deviceType: device,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });
});
