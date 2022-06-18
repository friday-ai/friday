import error from '../../../../utils/decorators/error';
import { FeatureParameter } from '../../../../utils/interfaces';

async function setPlanning(params: FeatureParameter) {
  try {
    // set planning by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'SET_PLANNING', params },
    });
  }
}

async function getplanning(params: FeatureParameter) {
  try {
    // get planning by event
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'GET_PLANNING', params },
    });
  }
}

export {
  setPlanning,
  getplanning,
};
