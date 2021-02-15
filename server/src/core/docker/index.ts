import Dockerode from 'dockerode';
import isDocker from './docker.isDocker';
import getAllContainers from './docker.getAllContainers';
import getContainer from './docker.getContainer';
import start from './docker.start';
import stop from './docker.stop';
import restart from './docker.restart';
import remove from './docker.remove';
import pull from './docker.pull';
import createContainer from './docker.createContainer';
import exec from './docker.exec';

export default class Docker {
  isDocker = isDocker;
  getAllContainers = getAllContainers;
  getContainer = getContainer;
  start = start;
  stop = stop;
  restart = restart;
  remove = remove;
  pull = pull;
  createContainer = createContainer;
  exec = exec;

  public dockerode = isDocker() ? new Dockerode() : null;
}
