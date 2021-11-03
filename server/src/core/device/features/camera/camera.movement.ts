import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';
import { AvailableState, StateOwner } from '../../../../utils/constants';

async function setMovement(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MOVEMENT_DETECTED,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_MOVEMENT', params },
    });
  }
}

async function getMovement(params: FeatureParameter) {
  try {
    const state = await params.deviceClass.state.getByOwner(params.device.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_MOVEMENT', params },
    });
  }
}

export {
  setMovement,
  getMovement,
};
