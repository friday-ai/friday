import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';
import { StateOwner } from '../../../../config/constants';

async function setMode(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state!,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_MODE', params },
    });
  }
}

async function getMode(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.getByOwner(params.deviceType.id!);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_MODE', params },
    });
  }
}

export {
  setMode,
  getMode,
};
