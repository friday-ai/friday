import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function getMetadata(params: FeatureParameter) {
  try {
    // get metadata by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'METADATA', params },
    });
  }
}
