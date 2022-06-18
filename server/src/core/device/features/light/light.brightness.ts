import error from '../../../../utils/decorators/error';
import { StateOwner } from '../../../../config/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setBrightness(params: FeatureParameter) {
  try {
    if (typeof params.state !== 'number') {
      throw new Error('State is not supported for this feature');
    }

    return await params.deviceClass.state.set({
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
    return await params.deviceClass.state.getByOwner(params.deviceType.id!);
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
