import { JobHandlerInterface, JobParams } from '../types/index.js'

export abstract class JobHandler implements JobHandlerInterface {
  abstract handle(param?: JobParams): void
}
