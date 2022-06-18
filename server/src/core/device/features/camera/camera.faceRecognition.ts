import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

export default async function faceRecognition(params: FeatureParameter) {
  try {
    return await params.userClass!.getById(params.userId!);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'FACE_RECOGNITION', params },
    });
  }
}
