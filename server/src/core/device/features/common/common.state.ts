import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setState(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
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
    const state = await params.deviceClass.state.getByOwner(params.deviceType.id!);
    return state.value;
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
