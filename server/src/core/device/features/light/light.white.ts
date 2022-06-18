import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';
import { AvailableState, StateOwner } from '../../../../config/constants';

export default async function white(params: FeatureParameter) {
  try {
    return await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_LIGHT_WHITE,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WHITE', params },
    });
  }
}
