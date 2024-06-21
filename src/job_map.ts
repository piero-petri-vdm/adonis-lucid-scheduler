import { JobMapType, JobHandler } from '@adonisjs/core/types'

export const JobMap: JobMapType = new Map<string, typeof JobHandler>([
  // list of job name and job class
])
