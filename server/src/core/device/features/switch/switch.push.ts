import error from '../../../../utils/errors/coreError';
import { AvailableState, StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function push(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_SWITCH_PUSH,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PUSH', params },
    });
  }
}
