import error from '../../../../utils/decorators/error';
import { StateOwner } from '../../../../config/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setChannel(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state!,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_CHANNEL', params },
    });
  }
}

async function getChannel(params: FeatureParameter) {
  try {
    const state = await params.deviceClass.state.getByOwner(params.deviceType.id!);

    if (typeof state.value === 'string') {
      state.value = parseInt(state.value, 10);
    }
    return state;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_CHANNEL', params },
    });
  }
}

export {
  setChannel,
  getChannel,
};
