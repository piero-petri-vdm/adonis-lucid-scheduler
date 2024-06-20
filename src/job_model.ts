import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export class DBJobModel extends BaseModel {
  static table = 'jobs'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cron: string

  @column()
  declare data: string

  @column.dateTime()
  declare nextRunAt: DateTime | null

  @column.dateTime()
  declare lastRunAt: DateTime | null

  @column.dateTime()
  declare lastFinishedAt: DateTime | null

  @column.dateTime()
  declare lockedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
