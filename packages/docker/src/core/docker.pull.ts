import logger from "@friday-ai/logger";
import streamToPromise from "stream-to-promise";
import type Docker from "../index";
import { PlatformNotCompatible } from "../utils/error";

/**
 * Pull an new container image.
 * @param {string} repoTag - Container image name (optionally with tag).
 * @param {Function} onProgress - Callback on progress event. (Optional)
 * @example
 * await docker.pull('my-image');
 */
export default async function pull(this: Docker, repoTag: string, _onProgress = logger.info): Promise<void> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({
      name: "Platform not compatible",
      message: "App not running on Docker",
    });
  }

  await streamToPromise(await this.dockerode.pull(repoTag));
}
