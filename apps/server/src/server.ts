import logger from "@friday-ai/logger";
import Server from "./api/app";
import Friday from "./core/friday";

const port = Number.parseInt(process.env.SERVER_PORT || "3000", 10);

(async () => {
  try {
    logger.init("Friday");

    // Create Friday object
    const friday = new Friday();

    // Start Friday core
    logger.info("Starting Friday core");
    await friday.start();

    // Start Friday server
    logger.info("Starting Friday server");
    await new Server(port, friday).start();
  } catch (e) {
    logger.error(e);
  }
})();
