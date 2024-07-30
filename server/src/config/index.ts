import type { IAppConfig, appRegToken } from './app.config'
import { AppConfig } from './app.config'
import type { IDatabaseConfig, dbRegToken } from './database.config'
import { DatabaseConfig } from './database.config'
import type { IMailerConfig, mailerRegToken } from './mailer.config'
import { MailerConfig } from './mailer.config'
import type { IOssConfig, ossRegToken } from './oss.config'
import { OssConfig } from './oss.config'
import type { IRedisConfig, redisRegToken } from './redis.config'
import { RedisConfig } from './redis.config'
import type { ISecurityConfig, securityRegToken } from './security.config'
import { SecurityConfig } from './security.config'
import type { ISwaggerConfig, swaggerRegToken } from './swagger.config'
import { SwaggerConfig } from './swagger.config'

export * from './app.config'
export * from './redis.config'
export * from './database.config'
export * from './swagger.config'
export * from './security.config'
export * from './mailer.config'
export * from './oss.config'

export interface AllConfigType {
  [appRegToken]: IAppConfig
  [dbRegToken]: IDatabaseConfig
  [mailerRegToken]: IMailerConfig
  [redisRegToken]: IRedisConfig
  [securityRegToken]: ISecurityConfig
  [swaggerRegToken]: ISwaggerConfig
  [ossRegToken]: IOssConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
  AppConfig,
  DatabaseConfig,
  MailerConfig,
  OssConfig,
  RedisConfig,
  SecurityConfig,
  SwaggerConfig,
}
