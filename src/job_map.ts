import { JobMapType } from '#types/index'
import { JobHandler } from '#src/job_handler'

export const JobMap: JobMapType = new Map<string, typeof JobHandler>([
  // list of job name and job class
])
