import error from '../../../../utils/errors/coreError';
import { AvailableState, StateOwner } from '../../../../utils/constants';
import { FeatureParameter } from '../../../../utils/interfaces';

async function startRecord(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_START_RECORD,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'START_RECORD', params },
    });
  }
}

async function stopRecord(params: FeatureParameter) {
  try {
    await params.deviceClass.state.set({
      owner: params.device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_STOP_RECORD,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'STOP_RECORD', params },
    });
  }
}

export {
  startRecord,
  stopRecord,
};
