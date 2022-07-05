import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import Options from 'mailgun.js/interfaces/Options';

// tslint:disable-next-line:no-empty-interface
export interface MailgunOptions extends Options {}

export interface MailgunOptionsFactory {
  createMailgunOptions(): Promise<MailgunOptions> | MailgunOptions;
}

export interface MailgunAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<MailgunOptionsFactory>;
  useClass?: Type<MailgunOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailgunOptions> | MailgunOptions;
}
