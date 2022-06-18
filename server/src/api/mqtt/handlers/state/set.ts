import logger from '../../../../utils/log';
import MqttServer from '../../index';
import { StateType } from '../../../../config/entities';

/*
 * @route('friday/master/state/set')
 * @param('Object', 'payload', '{stateId: string, deviceId: string, state: StateType }')
 */
export default async function set(this: MqttServer, payload: { stateId: string, deviceId: string, state: StateType }) {
  logger.info(`State set ${payload.stateId} on ${payload.deviceId}`);
  await this.friday.state.set(payload.state);
}
