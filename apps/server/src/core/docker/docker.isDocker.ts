import fs from 'fs';
import { execSync } from 'child_process';

const hasDockerEnv = () => fs.existsSync('/.dockerenv');
const hasDockerCGroup = () => fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');

const hasDockerInstalled = () => {
  try {
    execSync('docker --help', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Check if is running inside Docker.
 * @returns {Promise<boolean>} Resolve with true if inside Docker.
 * @example
 * ````
 * const runOnDocker = friday.docker.isDocker();
 * ````
 */
export default function isDocker(): boolean {
  try {
    return hasDockerEnv() || hasDockerCGroup();
  } catch (e) {
    return hasDockerInstalled();
  }
}
