import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';
import { AvailableState, StateOwner } from '../../../../utils/constants';

export default async function previous(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_PREVIOUS,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PREVIOUS', params },
    });
  }
}
