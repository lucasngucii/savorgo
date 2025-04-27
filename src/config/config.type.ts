import { AppConfig } from './app-config.type';
import { AuthConfig } from '../auth/config/auth-config.type';
import { FileConfig } from '../files/config/file-config.type';
import { MailConfig } from '../mail/config/mail-config.type';
import { MongoConfig } from '../database/config/database-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  mongo: MongoConfig;
  file: FileConfig;
  mail: MailConfig;
};
