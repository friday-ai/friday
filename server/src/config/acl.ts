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
        resource: 'variable', action: '!create', attributes: ['*'],
      },
      {
        resource: 'variable', action: '!update', attributes: ['*'],
      },
      {
        resource: 'variable', action: '!delete', attributes: ['*'],
      },
    ],
  },
  [UserRole.HABITANT]: {
    grants: [
      {
        resource: '*', action: '*', attributes: ['*'],
      },
      {
        resource: 'variable', action: '!create', attributes: ['*'],
      },
      {
        resource: 'variable', action: '!update', attributes: ['*'],
      },
      {
        resource: 'variable', action: '!delete', attributes: ['*'],
      },
      {
        resource: 'plugin', action: '!create', attributes: ['*'],
      },
      {
        resource: 'plugin', action: '!update', attributes: ['*'],
      },
      {
        resource: 'plugin', action: '!delete', attributes: ['*'],
      },
    ],
  },
  [UserRole.GUEST]: {
    grants: [
      {
        resource: 'user', action: 'login', attributes: ['*'],
      },
      {
        resource: 'action', action: 'read', attributes: ['*'],
      },
      {
        resource: 'device', action: 'read', attributes: ['*'],
      },
      {
        resource: 'house', action: 'read', attributes: ['*'],
      },
      {
        resource: 'room', action: 'read', attributes: ['*'],
      },
      {
        resource: 'state', action: 'read', attributes: ['*'],
      },
      {
        resource: 'trigger', action: 'read', attributes: ['*'],
      },
    ],
  },
};
