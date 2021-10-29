import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setChannel(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.device.id!,
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
    const state = await params.deviceClass.state.getByOwner(params.device.id!);
    return state.value;
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
