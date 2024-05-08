import type { SessionAttributes } from "@friday-ai/shared";
import Session from "../../models/session";
import { BadParametersError, NotFoundError } from "../../utils/decorators/error";

/**
 * Revoke an session.
 * @param {String} sessionId - Id of session.
 * @returns {Promise<SessionAttributes>} Resolve with session revoked.
 * @example
 * ````
 * friday.session.revoke('b991aa73-2acb-4e24-8f95-66fbd27506b6');
 * ````
 */
export default async function revoke(sessionId: string): Promise<SessionAttributes> {
  if (sessionId === "" || sessionId === null || sessionId === undefined) {
    throw new BadParametersError({ name: "Revoke an Session", message: "Incorrect params", metadata: { sessionId } });
  }

  const session = await Session.findOne({
    where: {
      id: sessionId,
    },
  });

  if (session === null) {
    throw new NotFoundError({ name: "Revoke an Session", message: "Session not found", metadata: { sessionId } });
  }

  session.revoked = true;
  await session.save();

  return <SessionAttributes>session.get({ plain: true });
}
