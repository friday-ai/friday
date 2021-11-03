import error from '../../../../utils/errors/coreError';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function faceRecognition(params: FeatureParameter) {
  try {
    const user = await params.userClass!.getById(params.userId!);
    return user;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'FACE_RECOGNITION', params },
    });
  }
}
