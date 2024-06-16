import type { Request, Response } from "express";
import { FridayRouter, Post } from "../../../utils/decorators/route";

import type Friday from "../../../core/friday";

/**
 * Capability router
 */
@FridayRouter("/v1/capability")
export default class ActionRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Set Capability state
   * @apiName setState
   */
  @Post({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "update",
    aclResource: "capability",
  })
  setState = async (req: Request, res: Response) => {
    const capability = await this.friday.device.getCapabilityById(req.params.id, "withSettingsAndDevice");

    this.friday.event.emit(req.body.action, {
      action: req.body.action,
      emitter: "client",
      capability,
      params: {
        capabilityId: req.params.id,
        value: req.body.value,
      },
    });

    res.status(200).json({ success: true });
  };
}
