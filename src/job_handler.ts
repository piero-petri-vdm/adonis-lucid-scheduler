import { JobHandlerInterface, JobParams } from '#types/index'

export abstract class JobHandler implements JobHandlerInterface {
  abstract handle(param?: JobParams): void
}
