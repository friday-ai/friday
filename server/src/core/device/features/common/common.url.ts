import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setUrl(params: FeatureParameter) {
  try {
    // set url by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_URL', params },
    });
  }
}

async function getUrl(params: FeatureParameter) {
  try {
    // send url by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_URL', params },
    });
  }
}

export {
  setUrl,
  getUrl,
};
