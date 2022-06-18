import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function launchGame(params: FeatureParameter) {
  try {
    // launch game by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'LAUNCH_GAME', params },
    });
  }
}
