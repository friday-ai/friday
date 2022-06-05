import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setBattery(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state!,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_BATTERY', params },
    });
  }
}

async function getBattery(params: FeatureParameter) {
  try {
    const state = await params.deviceClass.state.getByOwner(params.deviceType.id!);
    return state;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_BATTERY', params },
    });
  }
}

export {
  setBattery,
  getBattery,
};
