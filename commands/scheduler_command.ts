import { BaseCommand, args } from '@adonisjs/core/ace'
import { join } from 'node:path'
const dirname = import.meta.dirname

export default class MakeJob extends BaseCommand {
  /**
   * Command Name is used to run the command
   */
  static commandName = 'make:job'

  /**
   * Command Name is displayed in the "help" output
   */
  static description = 'Make a new job'

  @args.string({ description: 'Name of the job', required: true })
  declare name: string

  /**
   * This command loads the application
   */
  static settings = {
    loadApp: true,
  }

  /**
   * Execute command
   */
  async run(): Promise<void> {
    const stub = join(dirname, '..', 'templates', 'models', 'job.txt')

    const path = this.app.rcFile.directories.jobs || 'app/jobs'

    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(this.app.appRoot.toString(), path, { stub })
  }
}
