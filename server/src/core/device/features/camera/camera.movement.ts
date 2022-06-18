import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';
import { AvailableState, StateOwner } from '../../../../config/constants';

async function setMovement(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
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
    return await params.deviceClass.state.getByOwner(params.deviceType.id!);
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
