import error from '../../../../utils/errors/coreError';
import { AvailableState, StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function switchOutlet(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_OUTLET_SWITCH,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SWITCH_OUTLET', params },
    });
  }
}
