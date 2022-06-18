import error from '../../../../utils/decorators/error';
import { StateOwner } from '../../../../config/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setState(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state!,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_STATE', params },
    });
  }
}

async function getState(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.getByOwner(params.deviceType.id!);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_STATE', params },
    });
  }
}

export {
  setState,
  getState,
};
