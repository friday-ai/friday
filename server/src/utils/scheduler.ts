import schedule from 'node-schedule';
import { JobsInterface } from './interfaces';
import Log from './log';
import EventClass from './event';

const logger = new Log();

/**
 * Friday scheduler
 * @class Scheduler
 */
export default class Scheduler {
  public event: EventClass;
  public jobs: Array<JobsInterface>;

  constructor(event: EventClass, jobs: Array<JobsInterface>) {
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
