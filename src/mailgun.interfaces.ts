import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { MailgunClientOptions } from 'mailgun.js/Types/MailgunClient';

// tslint:disable-next-line:no-empty-interface
export interface MailgunOptions extends MailgunClientOptions {}

export interface MailgunOptionsFactory {
  createMailgunOptions(): Promise<MailgunOptions> | MailgunOptions;
}

export interface MailgunAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<MailgunOptionsFactory>;
  useClass?: Type<MailgunOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailgunOptions> | MailgunOptions;
}
