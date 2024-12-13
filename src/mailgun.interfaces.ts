import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { MailgunClientOptions } from 'mailgun.js/Types/MailgunClient';

export type MailgunOptions = MailgunClientOptions;

export interface MailgunOptionsFactory {
  createMailgunOptions(): Promise<MailgunOptions> | MailgunOptions;
}

export interface MailgunAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<MailgunOptionsFactory>;
  useClass?: Type<MailgunOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailgunOptions> | MailgunOptions;
}
