import type { NextFunction, Request, Response } from "express";
import type Friday from "../../core/friday";
import httpError, { Error401 } from "../../utils/httpError";

export default (friday: Friday) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string = req.headers.authorization || "";

    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      const { role } = await friday.session.validateAccessToken(token);
      // Save user role for the next middleware
      req.userRole = role;
      next();
    } else {
      throw new Error401({ name: "UNAUTHORIZED", message: "No authorization header found." });
    }
  } catch (e) {
    const responseError = httpError(e);
    res.status(responseError.status).send(responseError);
  }
};
