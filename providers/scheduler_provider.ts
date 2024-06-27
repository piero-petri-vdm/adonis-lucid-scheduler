import { JobHandler } from '#src/job_handler'
import { SchedulerConfig } from '#types/index'
import { ApplicationService } from '@adonisjs/core/types'
import { scheduleJob } from 'node-schedule'

/**
 * Scheduler service provider
 */
export default class SchedulerProvider {
  constructor(protected app: ApplicationService) {}

  static needsApplication = true

  private registerJob() {
    this.app.container.bind('Vidiemme/Scheduler/Job', async () => {
      const { JobHandler: handler } = await import('#src/job_handler')
      const { DBJobModel } = await import('#src/job_model')
      const { JobMap } = await import('#src/job_map')

      return {
        JobHandler: handler as new () => JobHandler,
        DBJobModel,
        JobMap,
      }
    })
  }

  private registerRunner() {
    this.app.container.singleton('Vidiemme/Scheduler/Runner', async () => {
      const { Runner } = await import('#src/runner')
      return { Runner }
    })
  }

  private registerScheduler() {
    this.app.container.singleton('Vidiemme/Scheduler/Scheduler', async () => {
      const config = this.app.config.get('scheduler.schedulerConfig') as SchedulerConfig

      const { Scheduler } = await import('#src/scheduler')

      const { JobMap } = await this.app.container.make('Vidiemme/Scheduler/Job')
      const logger = await this.app.container.make('Adonis/Core/Logger')
      const database = await this.app.container.make('Adonis/Lucid/Database')

      return {
        Scheduler: new Scheduler(logger, database, JobMap, config),
      }
    })
  }

  private registerCommand() {
    this.app.container.bind('Vidiemme/Scheduler/Commands', async () => {
      const command = await import('#commands/scheduler_command')
      return command.default
    })
  }

  /**
   * Called when registering providers
   */
  register(): void {
    this.registerJob()
    this.registerRunner()
    this.registerScheduler()
    this.registerCommand()
  }

  /**
   * Called when all bindings are in place
   */
  async boot(): Promise<void> {
    const { Scheduler } = await this.app.container.make('Vidiemme/Scheduler/Scheduler')
    scheduleJob('* * * * *', Scheduler.extractJobs.bind(Scheduler))
  }
}
