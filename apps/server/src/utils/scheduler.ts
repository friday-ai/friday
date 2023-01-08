import schedule from 'node-schedule';
import { JobsInterface } from './interfaces';
import logger from './log';
import EventClass from './event';

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
    this.jobs.forEach((job) => {
      this.run(job);
    });
  };

  run = async (job: JobsInterface) => {
    schedule.scheduleJob(job.rule, () => {
      logger.info(`Running job "${job.name}"`);
      this.event.emit(job.event);
    });
  };
}
