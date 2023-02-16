import React from 'react';

import LightCard from './Type/LightCard';

import { DeviceType } from '../../utils/interfaces';

interface DeviceCardProps {
  device: DeviceType;
}

function DeviceCard({ device }: DeviceCardProps) {
  const onOffCpapbility = device.capabilities?.filter((c) => c.type === 'onoff')[0];
  const brightnessCapability = device.capabilities?.filter((c) => c.type === 'brightness')[0];

  if (brightnessCapability) {
    return <LightCard brightness={brightnessCapability} />;
  }

  if (onOffCpapbility) {
    return <LightCard onoff={onOffCpapbility} />;
  }

  return <div className="card-base hidden">Device Not supported, :/</div>;
}

export default DeviceCard;
