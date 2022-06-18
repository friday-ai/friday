import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setPlaylist(params: FeatureParameter) {
  try {
    // set playlist
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PLAYLIST', params },
    });
  }
}

async function getPlaylist(params: FeatureParameter) {
  try {
    // get playlist by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PLAYLIST', params },
    });
  }
}

export {
  setPlaylist,
  getPlaylist,
};
