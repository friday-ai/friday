import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function getTitle(params: FeatureParameter) {
  try {
    // get title by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'TITLE', params },
    });
  }
}
