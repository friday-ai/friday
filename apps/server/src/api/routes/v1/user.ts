import type { Request, Response } from "express";
import { FridayMode } from "../../../config/constants";
import type Friday from "../../../core/friday";
import { Delete, FridayRouter, Get, Patch, Post } from "../../../utils/decorators/route";

/**
 * User router
 * @apiDefine UserParam
 * @apiParam {String} name Name of the user.
 * @apiParam {String} firstName Firstname of the user.
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {Date} [birthDate] Birth date of the user
 * @apiParam {UserRole} [role] Role of the user
 * @apiParam {AvailableLanguages} [language] Language of the user
 */
@FridayRouter("/v1/user")
export default class UserRouter {
  private readonly friday: Friday;

  constructor(friday: Friday) {
    this.friday = friday;
  }

  /**
   * Create a user
   * @apiName create
   * @apiDescription This route allows you to create a user
   * @api {post} /api/v1/user
   * @apiGroup User
   * @apiUse UserParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   name: 'Pepperwood',
   *   firstName: 'John',
   *   email: 'john@pepperwood.com',
   *   birthDate: 20/12/1996
   * }
   */
  @Post({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "create",
    aclResource: "user",
  })
  create = async (req: Request, res: Response) => {
    const user = await this.friday.user.create(req.body);
    res.status(201).json(user);
  };

  /**
   * Update a user
   * @apiName create
   * @apiDescription This route allows you to update a user
   * @api {patch} /api/v1/user
   * @apiGroup User
   * @apiUse UserParam
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   name: 'Pepperwood',
   *   firstName: 'John',
   *   email: 'john@pepperwood.com',
   *   birthDate: 20/12/1996
   * }
   */
  @Patch({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "update",
    aclResource: "user",
  })
  update = async (req: Request, res: Response) => {
    const user = await this.friday.user.update(req.params.id, req.body);
    res.json(user);
  };

  /**
   * Delete a user by id
   * @apiName destroy
   * @apiDescription This route allows you to delete a user
   * @api {delete} /api/v1/user/:id
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   "success": "true",
   * }
   */
  @Delete({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "delete",
    aclResource: "user",
  })
  destroy = async (req: Request, res: Response) => {
    await this.friday.user.destroy(req.params.id);
    res.json({
      success: true,
    });
  };

  /**
   * List All users
   * @apiName listAll
   * @apiDescription This route allows you to List All users
   * @api {get} /api/v1/user
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * [{
   *   id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   userName: 'JohnPepperwood',
   *   email: 'john@pepperwood.com',
   *   birthDate: 20/12/1996
   * }]
   */
  @Get({
    path: "/",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "user",
  })
  listAll = async (req: Request, res: Response) => {
    const users = await this.friday.user.listAll(req.query);
    res.json(users);
  };

  /**
   * Get user count
   * @apiName getUsersCount
   * @apiDescription This route allows you to know the number of registered users
   * @api {post} /api/v1/user/count
   * @apiGroup User
   * @apiVersion 1.0.0
   */
  @Get({
    path: "/count",
    authenticated: false,
    rateLimit: true,
    aclMethod: "read",
    aclResource: "user",
  })
  getUsersCount = async (_: Request, res: Response) => {
    const count = await this.friday.user.count();
    res.status(200).json(count);
  };

  /**
   * Get a user by id
   * @apiName getById
   * @apiDescription This route allows you to get a user with his identifier
   * @api {get} /api/v1/user/:id
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response
   * {
   *   id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
   *   userName: 'JohnPepperwood',
   *   email: 'john@pepperwood.com',
   *   birthDate: 20/12/1996
   * }
   */
  @Get({
    path: "/:id",
    authenticated: true,
    rateLimit: false,
    aclMethod: "read",
    aclResource: "user",
  })
  getById = async (req: Request, res: Response) => {
    const scope = req.query.scope as string;
    const user = await this.friday.user.getById(req.params.id, scope);
    res.json(user);
  };

  /**
   * Login a user
   * @apiPrivate
   * @apiName login
   * @apiDescription This route allows you to login
   * @api {post} /api/v1/user/login
   * @apiGroup User
   * @apiParam {String} email Email of the user
   * @apiParam {String} password Password of the user
   * @apiVersion 1.0.0
   */
  @Post({
    path: "/login",
    authenticated: false,
    rateLimit: true,
    aclMethod: "login",
    aclResource: "user",
  })
  login = async (req: Request, res: Response) => {
    const user = await this.friday.user.login(req.body.email, req.body.password);
    const session = await this.friday.session.create(user, req.headers["user-agent"]);
    res.status(201).json(session);
  };

  /**
   * Sign up a user
   */
  @Post({
    path: "/signup",
    authenticated: false,
    rateLimit: true,
    aclMethod: "",
    aclResource: "",
  })
  signup = async (req: Request, res: Response) => {
    // This route is only active at first start for security reasons
    if (this.friday.mode === FridayMode.INIT) {
      const user = await this.friday.user.create(req.body);
      const session = await this.friday.session.create(user);
      res.status(201).json(session);
    } else {
      res.sendStatus(404);
    }
  };
}
