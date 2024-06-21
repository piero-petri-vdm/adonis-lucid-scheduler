import { DBJobModel } from '#src/job_model'
import { Runner } from '#src/runner'
import { BaseCommand } from '@adonisjs/core/ace'


type Primitive = string | boolean | number | bigint | symbol | null | undefined

export interface RunnerInterface {
  run: Function
}

export interface SchedulerInterface {
  extractJobs: Function
}


export type SchedulerConfig = {
  prefix: string
}

declare module '@adonisjs/core/types' {
  export type JobParams = { [key: string]: Primitive }

  export interface JobHandlerInterface {
    handle(param?: JobParams): void
  }

  export type JobMapType = Map<string, typeof JobHandler>

  export class JobHandler implements JobHandlerInterface {
    handle(param?: JobParams): void
  }

  interface ContainerBindings {
    'Vidiemme/Scheduler/Job': {
      JobHandler: typeof JobHandler
      DBJobModel: typeof DBJobModel
      JobMap: JobMapType
    }
    'Vidiemme/Scheduler/Scheduler': { Scheduler: SchedulerInterface }
    'Vidiemme/Scheduler/Runner': { Runner: typeof Runner }
    'Vidiemme/Scheduler/Commands': typeof BaseCommand
  }

}
