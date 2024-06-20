import { JobHandler } from '#src/job_handler'
import { DBJobModel } from '#src/job_model'
import { Runner } from '#src/runner'
import { BaseCommand } from '@adonisjs/core/ace'

export type JobMapType = Map<string, typeof JobHandler>

type Primitive = string | boolean | number | bigint | symbol | null | undefined
export type JobParams = { [key: string]: Primitive }

export interface JobHandlerInterface {
  handle(param?: JobParams): void
}

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
  interface ContainerBindings {
    'Vidiemme/Scheduler/Job': {
      JobHandler: JobHandler
      DBJobModel: DBJobModel
      JobMap: JobMapType
    }
    'Vidiemme/Scheduler/Scheduler': SchedulerInterface
    'Vidiemme/Scheduler/Runner': Runner
    'Vidiemme/Scheduler/Commands': BaseCommand
  }

  export class JobHandler implements JobHandlerInterface {
    public handle(param?: JobParams): void
  }
}
