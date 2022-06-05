import React from 'react';
import { Flipped } from 'react-flip-toolkit';

import { SatelliteType } from '../../utils/interfaces';
import { AvailableState } from '../../utils/constants';
import { PluginList } from '../Plugins/PluginsCard';
import Dropdown from '../Generic/Dropdown';
import Badge from '../Badge/Badge';

const getBorderColor = (state: AvailableState): string => {
  switch (state) {
    case AvailableState.SATELLITE_CONNECTED:
      return 'border-base-300';
    case AvailableState.SATELLITE_DISCONNECTED:
      return 'border-error';
    case AvailableState.SATELLITE_STANDBY:
      return 'border-info';
    case AvailableState.SATELLITE_ERRORED:
      return 'border-error';
    case AvailableState.SATELLITE_WAITING_CONFIGURATION:
      return 'border-warning';
    default:
      return 'border-error';
  }
};

const SatelliteState: React.FC<{ state: AvailableState }> = ({ state }) => {
  switch (state) {
    case AvailableState.SATELLITE_CONNECTED:
      return <Badge text="online" type="badge-success" />;
    case AvailableState.SATELLITE_DISCONNECTED:
      return <Badge text="offline" type="badge-error" />;
    case AvailableState.SATELLITE_STANDBY:
      return <Badge text="stopped" type="badge-info" />;
    case AvailableState.SATELLITE_ERRORED:
      return <Badge text="errored" type="badge-error" />;
    case AvailableState.SATELLITE_WAITING_CONFIGURATION:
      return <Badge text="waiting config" type="badge-warning" />;
    default:
      return <Badge text="errored" type="badge-error" />;
  }
};

interface SatelliteCardProps {
  satellite: SatelliteType;
  flippedProps?: unknown;
}

const SatelliteCard: React.FC<SatelliteCardProps> = ({ flippedProps = {}, satellite }) => {
  return (
    <div className={`collapse w-full rounded-box collapse-arrow overflow-visible border ${getBorderColor(satellite.state.value)}`}>
      <input type="checkbox" />
      <div className="collapse-title grid grid-flow-col auto-cols-fr text-center items-center">
        <span className="col-span-2 text-left truncate">
          {satellite.name} - {satellite.room.name}
        </span>
        <a className="link z-10 hidden sm:block" href={`http://${satellite.url}`} target="blank" title={satellite.name}>
          {satellite.url}
        </a>
        <span className="hidden lg:block">{satellite.plugins.length} plugins</span>
        <span>
          <SatelliteState state={satellite.state.value} />
        </span>
        <span className="hidden md:block">{satellite.lastHeartbeat}</span>
        <div className="flex justify-end">
          <Dropdown
            className=""
            btnText=""
            btnStyle="btn btn-ghost btn-circle btn-sm z-10"
            title="Satellite Actions"
            icon="ic:round-menu-open"
            iconStyle="w-6 h-6"
            containerStyle="mt-8"
          >
            <ul className="menu compact p-3">
              <li>
                <button aria-label="Stop Satellite" type="button">
                  <span>Stop Satellite</span>
                </button>
              </li>
              <li>
                <button aria-label="Restart Satellite" type="button">
                  <span>Restart Satellite</span>
                </button>
              </li>
              <div className="divider divider-sm mx-3" />
              <li>
                <button aria-label="Stop all plugins" type="button">
                  <span>Stop all plugins</span>
                </button>
              </li>
              <li>
                <button aria-label="Restart all plugins" type="button">
                  <span>Restart all plugins</span>
                </button>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="collapse-content">
        <PluginList flipKey="test_key0" plugins={satellite.plugins} />
      </div>
    </div>
  );
};

interface PluginListProps {
  flipKey: string;
  satellites: SatelliteType[];
}

const SatelliteList = ({ flipKey, satellites }: PluginListProps): JSX.Element => {
  return (
    <>
      {satellites.map((satellite) => (
        <Flipped flipId={`item-${satellite.id}`} key={`item-${satellite.id}`}>
          {(flippedProps) => <SatelliteCard satellite={satellite} flippedProps={flippedProps} />}
        </Flipped>
      ))}
    </>
  );
};

export { SatelliteList, SatelliteCard };
