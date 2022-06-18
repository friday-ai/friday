import error from '../../../../utils/decorators/error';
import { AvailableState, StateOwner } from '../../../../config/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setWarmColdWhite(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_LIGHT_WARM_COLD_WHITE,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WARM_COLD_WHITE', params },
    });
  }
}

async function getWarmColdWhite(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.getByOwner(params.deviceType.id!);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WARM_COLD_WHITE', params },
    });
  }
}

export {
  setWarmColdWhite,
  getWarmColdWhite,
};
