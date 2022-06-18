import error from '../../../../utils/decorators/error';
import { AvailableState, StateOwner } from '../../../../config/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function warmWhite(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_LIGHT_WARM_WHITE,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WARM_WHITE', params },
    });
  }
}
