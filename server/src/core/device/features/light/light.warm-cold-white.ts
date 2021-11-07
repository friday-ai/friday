import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setWarmColdWhite(params: FeatureParameter) {
  try {
    if (typeof params.state !== 'string') {
      throw new Error('State is not supported for this feature');
    }

    await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state!,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WARM_COLD_WHITE', params },
    });
  }
}

async function getWarmColdWhite(params: FeatureParameter) {
  try {
    const state = await params.deviceClass.state.getByOwner(params.deviceType.id!);
    return state.value;
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
