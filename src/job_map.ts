// import { JobHandler, JobMapType } from '@ioc:Vidiemme/Scheduler/Job'

import { JobMapType } from '../types/index.js'
import { JobHandler } from './job_handler.js'

export const JobMap: JobMapType = new Map<string, typeof JobHandler>([
  // list of job name and job class
])
