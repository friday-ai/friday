import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';
import { StateOwner } from '../../../../utils/constants';

async function setSetpoint(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state!,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_SETPOINT', params },
    });
  }
}

async function getSetpoint(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.getByOwner(params.deviceType.id!);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_SETPOINT', params },
    });
  }
}

export {
  setSetpoint,
  getSetpoint,
};
