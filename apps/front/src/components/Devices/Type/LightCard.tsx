import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import useSharedApp from '../../../services/App';
import Switch from '../../Generic/Switch';

import { DeviceCapabilityType } from '../../../utils/interfaces';

interface LightCardProps {
  onoff?: DeviceCapabilityType;
  brightness?: DeviceCapabilityType;
}

// TODO: This complexity of state management will be do in backend

const LightCard: React.FC<LightCardProps> = ({ onoff, brightness }) => {
  const { capabilities } = useSharedApp();
  const [state, setState] = useState(0);

  const onChange = async (value: boolean | number) => {
    if (brightness) {
      if (typeof value === 'boolean') {
        setState(value === true ? brightness.settings?.settings?.max || 100 : brightness.settings?.settings?.min || 0);

        await capabilities.setState(brightness.id || '', {
          action: 'action.devices.commands.set_brightness',
          value: value === true ? brightness.settings?.settings?.max || 100 : 0,
        });
      } else {
        if (value === brightness.settings?.settings?.min) {
          setState(brightness.settings?.settings?.min);
          await capabilities.setState(brightness.id || '', { action: 'action.devices.commands.turn_off', value: false });
        }

        setState(value);
        await capabilities.setState(brightness.id || '', { action: 'action.devices.commands.set_brightness', value });
      }
      return;
    }

    if (onoff) {
      setState(value === true ? 1 : 0);
      if (value === true) {
        await capabilities.setState(onoff.id || '', { action: 'action.devices.commands.turn_on', value: true });
        return;
      }

      await capabilities.setState(onoff.id || '', { action: 'action.devices.commands.turn_off', value: false });
    }
  };

  if (brightness) {
    return (
      <div className="card-base space-y-5">
        <div className="flex flex-row space-x-5 items-center">
          <button className="btn btn-primary btn-circle" type="button" onClick={() => onChange(state === brightness.settings?.settings?.min)}>
            <Icon icon="mdi:lightbulb-outline" className="w-7 h-7" />
          </button>
          <div className="flex flex-col grow">
            <span className="text-primary">{brightness.defaultName}</span>
            <span className="text-neutral">{state !== brightness.settings?.settings?.min ? 'On' : 'Off'}: Salon</span>
          </div>
          <Switch id={`light-${brightness?.id}`} label="" checked={state !== brightness.settings?.settings?.min} cb={(s: boolean) => onChange(s)} />
        </div>
        <div>
          <input
            className="range"
            type="range"
            min={brightness.settings?.settings?.min}
            max={brightness.settings?.settings?.max}
            step={brightness.settings?.settings?.step}
            value={state}
            onChange={(e) => onChange(Number(e.currentTarget.value))}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card-base flex flex-row space-x-5 items-center">
      <button className="btn btn-primary btn-circle" type="button" onClick={() => onChange(state === 0)}>
        <Icon icon="mdi:lightbulb-outline" className="w-7 h-7" />
      </button>
      <div className="flex flex-col grow">
        <span className="text-primary">{onoff?.defaultName}</span>
        <span className="text-neutral">{state === 1 ? 'On' : 'Off'}: Salon</span>
      </div>
      <Switch id={`light-${onoff?.id}`} label="" checked={state === 1} cb={(s: boolean) => onChange(s)} />
    </div>
  );
};

LightCard.defaultProps = {
  onoff: undefined,
  brightness: undefined,
};

export default LightCard;
