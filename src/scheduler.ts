import { DateTime } from 'luxon'

import { Logger } from '@adonisjs/core/logger'
import { LoggerConfig } from '@adonisjs/core/types/logger'
import { DBJobModel } from '#src/job_model'
import { Runner } from '#src/runner'
import { timeMatches } from '#src/utils'
import { JobMapType, SchedulerConfig, SchedulerInterface } from '#types/index'
import { Database } from '@adonisjs/lucid/database'

export class Scheduler implements SchedulerInterface {
  constructor(
    protected logger: Logger<LoggerConfig>,
    protected database: Database,
    protected jobMap: JobMapType,
    protected config: SchedulerConfig
  ) {}

  async extractJobs() {
    const prefixJobName = this.config.prefix

    const dbJobs = await DBJobModel.query()
      .whereNull('lockedAt')
      .where((query) => {
        query.whereNull('nextRunAt').orWhere('nextRunAt', '<=', DateTime.now().toSQL())
      })

    await Promise.all(
      dbJobs.map(async (dbJob) => {
        const jobClass = this.jobMap.get(dbJob.name)
        if (!jobClass) {
          this.logger.debug(`Scheduler - Job '${dbJob.name}' not in list`)
          // job not in list
          return
        }

        if (!timeMatches(dbJob.cron)) {
          // the cron job does not match the current date, hour and minute
          // seconds not supported
          return
        }

        this.logger.debug(`Scheduler - Running job '${dbJob.name}'`)
        const runner = new Runner(this.logger, this.database, prefixJobName, dbJob, jobClass)
        await runner.run()
      })
    )

    try {
      // releasing all lock of the current session
      await this.database.rawQuery('SELECT RELEASE_ALL_LOCKS();')
    } catch (e) {
      this.logger.warn(e)
    }
  }
}
