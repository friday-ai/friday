import logger from "@friday-ai/logger";
import schedule from "node-schedule";
import type EventClass from "./event";
import type { JobsInterface } from "./interfaces";

/**
 * Friday scheduler
 * @class Scheduler
 */
export default class Scheduler {
  public event: typeof EventClass;
  public jobs: Array<JobsInterface>;

  constructor(event: typeof EventClass, jobs: Array<JobsInterface>) {
    this.event = event;
    this.jobs = jobs;
  }

  init = async () => {
    for (const job of this.jobs) {
      this.run(job);
    }
  };

  run = async (job: JobsInterface) => {
    schedule.scheduleJob(job.rule, () => {
      logger.info(`Running job "${job.name}"`);
      this.event.emit(job.event);
    });
  };
}
