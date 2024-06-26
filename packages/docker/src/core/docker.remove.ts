import type Docker from "../index";
import { PlatformNotCompatible } from "../utils/error";

/**
 * Remove a container with id.
 * @example
 * await docker.remove('71501a8ab0f8');
 */
export default async function remove(this: Docker, id: string) {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({
      name: "Platform not compatible",
      message: "App not running on Docker",
    });
  }
  const container = await this.getContainer(id);

  // If container is running, stop it before removing
  const containerInfos = await container.inspect();
  if (containerInfos.State.Status === "running") {
    await container.stop();
  }

  return container.remove();
}
