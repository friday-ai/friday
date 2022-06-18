import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function pushButton(params: FeatureParameter) {
  try {
    // send button by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PUSH_BUTTON', params },
    });
  }
}
