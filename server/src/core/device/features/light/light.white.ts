import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';
import { StateOwner } from '../../../../utils/constants';

export default async function white(params: FeatureParameter) {
  try {
    if (typeof params.state !== 'number') {
      throw new Error('State is not supported for this feature');
    }

    await params.deviceClass.state.set({
      owner: params.device.id!,
      ownerType: StateOwner.DEVICE,
      value: params.state,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WHITE', params },
    });
  }
}
