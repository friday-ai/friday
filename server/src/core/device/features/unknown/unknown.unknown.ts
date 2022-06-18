import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function unknown(params: FeatureParameter) {
  try {
    throw new Error('This feature is unknown');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'UNKNOWN', params },
    });
  }
}
