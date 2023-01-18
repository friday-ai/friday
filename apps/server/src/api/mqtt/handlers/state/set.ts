import { StateAttributes } from '@friday/shared';
import logger from '@friday/logger';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/state/set')
 * @param('Object', 'payload', '{stateId: string, deviceId: string, state: StateType }')
 */
export default async function set(friday: Friday, payload: { stateId: string; deviceId: string; state: StateAttributes }) {
  logger.info(`State set ${payload.stateId} on ${payload.deviceId}`);
  await friday.state.set(payload.state);
}
