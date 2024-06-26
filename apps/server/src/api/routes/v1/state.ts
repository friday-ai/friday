import type { Request, Response } from "express";
import type Friday from "../../../core/friday";
import { FridayRouter, Get, Post } from "../../../utils/decorators/route";

/**
 * State router
 * @apiDefine StateParam
 * @apiParam {String} owner Owner of the state.
 * @apiParam {StateOwner} owner Type The type of owner of the state.
 * @apiParam {AvailableState} value Value of the state.
 */
@FridayRouter("/v1/state")
export default class StateRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Set a state
   * @apiName set
   * @apiDescription This route allows you to set a state
   * @api {patch} /api/v1/state
   * @apiGroup State
   * @apiUse StateParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '17ea7282-507b-496b-b496-a6d8ce7fac17',
   *   owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
   *   ownerType: 'user',
   *   value: 'user.at.home'
   * }
   */
  @Post({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "create",
    aclResource: "state",
  })
  create = async (req: Request, res: Response) => {
    const state = await this.friday.state.set(req.body);
    res.json(state);
  };

  /**
   * Get a state by owner
   * @apiName getByOwner
   * @apiDescription This route allows you to get a state with his owner's identifier
   * @api {get} /api/v1/state/:id
   * @apiGroup State
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '17ea7282-507b-496b-b496-a6d8ce7fac17',
   *   owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
   *   ownerType: 'user',
   *   value: 'user.at.home'
   * }
   */
  @Get({
    path: "/:owner",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "state",
  })
  getByOwner = async (req: Request, res: Response) => {
    const state = await this.friday.state.getByOwner(req.params.owner);
    res.json(state);
  };
}
