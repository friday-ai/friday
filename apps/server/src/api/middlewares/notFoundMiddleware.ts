import type { Request } from "express";
import { Error404 } from "../../utils/httpError";

export default (req: Request) => {
  throw new Error404({ name: "NOT_FOUND", message: `Route ${req.path} not found` });
};
