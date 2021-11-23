import React, { useEffect, useState } from 'react';

import SatellitesToolbar from '../components/Satellites/SatellitesToolbar';
import { SatelliteType } from '../utils/interfaces';
import { useApi } from '../services/api/ApiProvider';
import { SatelliteList } from '../components/Satellites/SatellitesCard';

let satellitesList: SatelliteType[] = [];

const Satellites: React.FC = () => {
  const { satellites } = useApi();

  const [filteredSatellites, setFilteredSatellites] = useState<SatelliteType[]>([]);

  useEffect(() => {
    satellites.getAll().then((res) => {
      satellitesList = res.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name);
      });
      // setFlipKey(Math.floor(Math.random() * 10));
      setFilteredSatellites(satellitesList);
    });
  }, [satellites]);

  return (
    <div>
      <SatellitesToolbar onSearch={() => {}} onFilter={() => {}} onSort={() => {}} onCreate={() => {}} />

      <div className="mx-7 space-y-2 bg-base-100 border border-base-300 rounded-btn p-4">
        <div className="grid grid-flow-col auto-cols-fr text-center items-center font-bold pl-4 pr-16">
          <span className="col-span-2 text-left truncate">Name</span>
          <span className="hidden sm:block">Address</span>
          <span className="hidden lg:block">Plugins</span>
          <span className="">Status</span>
          <span className="hidden md:block">Uptime</span>
          <span />
        </div>
        <SatelliteList flipKey="test_key1" satellites={filteredSatellites} />
      </div>
    </div>
  );
};

export default Satellites;
