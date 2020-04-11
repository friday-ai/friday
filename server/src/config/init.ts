import VariableType from '../core/variable/variable.interface';
import RoomType from '../core/room/room.interface';
import HouseType from '../core/house/house.interface';
import SatelliteType from '../core/satellite/satellite.interface';
import { VariableOwner, SystemVariablesNames } from '../../src/utils/constants';

const version: string = process.env.npm_package_version!;

const house: HouseType = {
  name: 'Main House',
  latitude: '34.0012295',
  longitude: '-118.8067245'
};

const room: RoomType = {
  name: 'Main Room',
  houseId: ''
};

const satellite: SatelliteType = {
  name: 'Main Satellite',
  roomId: ''
};

const variables: Array<VariableType> = [
  {
    key: SystemVariablesNames.FRIDAY_VERSION,
    value: version,
    owner: '',
    ownerType: VariableOwner.SATELLITE
  },
  {
    key: SystemVariablesNames.HISTORY_STATE_IN_DAYS,
    value: '90',
    owner: '',
    ownerType: VariableOwner.SATELLITE
  },
  {
    key: SystemVariablesNames.NUMBER_OF_BACKUPS,
    value: '5',
    owner: '',
    ownerType: VariableOwner.SATELLITE
  }
];

export {
  house,
  room,
  satellite,
  variables
};
