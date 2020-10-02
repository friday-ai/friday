import { UserRole } from '../utils/constants';

export default {
  [UserRole.SUPERADMIN]: {
    grants: [
      {
        resource: '*', action: '*', attributes: ['*'],
      },
    ],
  },
  [UserRole.ADMIN]: {
    grants: [
      {
        resource: '*', action: '*', attributes: ['*'],
      },
      {
        resource: 'variable', action: ['!create', '!update', '!delete'], attributes: ['*'],
      },
    ],
  },
  [UserRole.HABITANT]: {
    grants: [
      {
        resource: '*', action: '*', attributes: ['*'],
      },
      {
        resource: 'variable', action: ['!create', '!update', '!delete'], attributes: ['*'],
      },
      {
        resource: 'plugin', action: ['!create', '!update', '!delete'], attributes: ['*'],
      },
    ],
  },
  [UserRole.GUEST]: {
    grants: [
      {
        resource: ['action', 'device', 'house', 'room', 'satellite', 'state'], action: 'read', attributes: ['*'],
      },
    ],
  },
};
