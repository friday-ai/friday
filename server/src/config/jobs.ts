import { EventsType } from '../utils/constants';
import { JobsInterface } from '../utils/interfaces';

const jobs: Array<JobsInterface> = [
  {
    name: 'Friday backup',
    rule: '0 0 * * *', // everyday at midnight
    event: EventsType.SYSTEM_BACKUP,
  },
  {
    name: 'Check Friday update',
    rule: '30 0 * * *', // everyday at midnight thirty
    event: EventsType.SYSTEM_CHECK_UPDATE,
  },
  {
    name: 'Purge states',
    rule: '0 1 * * *', // everyday at 1am
    event: EventsType.STATES_PURGE,
  },
];

export default jobs;
