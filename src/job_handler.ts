import { JobHandlerInterface, JobParams } from '@adonisjs/core/types'

export abstract class JobHandler implements JobHandlerInterface {
  abstract handle(param?: JobParams): void
}
