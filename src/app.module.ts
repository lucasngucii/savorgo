import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import mongooseAutoPopulate from 'mongoose-autopopulate';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AllConfigType>): Promise<MongooseModuleOptions> => ({
        uri: configService.getOrThrow('mongo.mongoUri', { infer: true }),
        maxPoolSize: configService.getOrThrow('mongo.poolSize', { infer: true }),
        maxConnecting: configService.getOrThrow('mongo.maxConnection', { infer: true }),
        connectionFactory(connection) {
          connection.plugin(mongooseAutoPopulate);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    OrdersModule,
  ],
})
export class AppModule { }
