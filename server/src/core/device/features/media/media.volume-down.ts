import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function volumeDown(params: FeatureParameter) {
  try {
    if (typeof params.state === 'number') {
      await params.deviceClass.state.set({
        owner: params.device.id!,
        ownerType: StateOwner.DEVICE,
        value: params.state,
      });
    }
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'VOLUME_DOWN', params },
    });
  }
}
