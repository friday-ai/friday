import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';
import { AvailableState, StateOwner } from '../../../../utils/constants';

export default async function fastForward(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_FAST_FORWARD,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'FAST_FORWARD', params },
    });
  }
}
