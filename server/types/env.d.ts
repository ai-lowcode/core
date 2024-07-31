// generate by ./scripts/generateEnvTypes.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: 'Nest Admin'
      APP_PORT: '7001'
      // eslint-disable-next-line no-template-curly-in-string
      APP_BASE_URL: 'http://localhost:${APP_PORT}'
      APP_LOCALE: 'zh-CN'
      PROJECT_DIR: '/nest-admin'
      MULTI_DEVICE_LOGIN: 'true'
      LOGGER_LEVEL: 'debug'
      LOGGER_MAX_FILES: '31'
      TZ: 'Asia/Shanghai'
      OSS_ACCESSKEY: 'xxx'
      OSS_SECRETKEY: 'xxx'
      OSS_DOMAIN: 'https://cdn.buqiyuan.site'
      OSS_BUCKET: 'nest-admin'
      OSS_ZONE: 'Zone_z2'
      OSS_ACCESS_TYPE: 'public'
      JWT_SECRET: 'admin!@'
      JWT_EXPIRE: '86400'
      REFRESH_TOKEN_SECRET: 'admin!@'
      REFRESH_TOKEN_EXPIRE: '2592000'
      SWAGGER_ENABLE: 'true'
      SWAGGER_PATH: 'api-docs'
      SWAGGER_VERSION: '1.0'
      DB_HOST: '127.0.0.1'
      DB_PORT: '3306'
      DB_DATABASE: 'nest_admin'
      DB_USERNAME: 'root'
      DB_PASSWORD: '123456'
      DB_SYNCHRONIZE: 'true'
      DB_LOGGING: '["error"]'
      REDIS_PORT: '6379'
      REDIS_HOST: '127.0.0.1'
      REDIS_PASSWORD: ''
      REDIS_DB: '0'
      SMTP_HOST: 'smtp.163.com'
      SMTP_PORT: '465'
      SMTP_USER: 'nest_admin@163.com'
      SMTP_PASS: 'VIPLLOIPMETTROYU'
    }
  }
}
export {}
