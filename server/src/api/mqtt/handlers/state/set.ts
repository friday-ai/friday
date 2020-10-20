import Log from '../../../../utils/log';
import MqttServer from '../../index';
import StateType from '../../../../core/state/state.interface';

const logger = new Log();

export default async function set(this: MqttServer, payload: { stateId: string, deviceId: string, state: StateType }) {
  logger.info(`State set ${payload.stateId} on ${payload.deviceId}`);
  await this.friday.state.set(payload.state);
}
