import React, { useState, useEffect } from 'react';

import useSharedApp from '../services/App';
import DeviceCard from '../components/Devices/DeviceCard';
import UndrawEmpty from '../components/Illustrations/UndrawEmpty';

import { DeviceType } from '../utils/interfaces';

const Devices: React.FC = () => {
  const { devices } = useSharedApp();
  const [filterdDevices, setFilteredDevices] = useState<DeviceType[]>([]);

  useEffect(() => {
    devices.getAll().then((res) => {
      setFilteredDevices(res);
    });
  }, [devices]);

  return (
    <div>
      <div className="grid-container grid-cols-minmax-280 m-5">
        {filterdDevices.map((device) => (
          <DeviceCard device={device} />
        ))}
      </div>

      {filterdDevices.length === 0 && (
        <div className="centered-container">
          <UndrawEmpty className="self-center" width="400" height="400" />
          <h1 className="my-5 text-4xl font-bold text-center">No results found.</h1>
        </div>
      )}
    </div>
  );
};

export default Devices;
