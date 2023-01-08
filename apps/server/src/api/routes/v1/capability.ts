import { Request, Response } from 'express';
import { FridayRouter, Post } from '../../../utils/decorators/route';

import Friday from '../../../core/friday';

/**
 * Capability router
 */
@FridayRouter('/v1/capability')
export default class ActionRouter {
  readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Set Capability state
   * @apiName setState
   */
  @Post({
    path : '/:id', authenticated: true, rateLimit: false, aclMethod: 'update', aclResource: 'capability',
  })
    setState = async (req: Request, res: Response) => {
      this.friday.event.emit(req.body.action, { id: req.params.id, value: req.body.value });
      res.status(200).json({ success: true });
    };
}
