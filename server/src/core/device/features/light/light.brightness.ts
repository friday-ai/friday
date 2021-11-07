import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setBrightness(params: FeatureParameter) {
  try {
    if (typeof params.state !== 'number') {
      throw new Error('State is not supported for this feature');
    }

    await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'BRIGHTNESS', params },
    });
  }
}

async function getBrightness(params: FeatureParameter) {
  try {
    const state = await params.deviceClass.state.getByOwner(params.deviceType.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'BRIGHTNESS', params },
    });
  }
}

export {
  setBrightness,
  getBrightness,
};
