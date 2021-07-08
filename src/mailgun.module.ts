import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { MailgunService } from './mailgun.service';
import { MAILGUN_OPTIONS, MAILGUN_TOKEN } from './mailgun.constants';
import { MailgunOptions, MailgunAsyncOptions, MailgunOptionsFactory } from './mailgun.interfaces';

export const connectionFactory = {
  provide: MAILGUN_TOKEN,
  useFactory: (mailgunService) => mailgunService.instance(),
  inject: [MailgunService],
};

@Global()
@Module({
  providers: [MailgunService, connectionFactory],
  exports: [MailgunService, connectionFactory],
})
export class MailgunModule {
  public static forRoot(options: MailgunOptions): DynamicModule {
    return {
      module: MailgunModule,
      providers: [{ provide: MAILGUN_OPTIONS, useValue: options }],
    };
  }

  public static forRootAsync(options: MailgunAsyncOptions): DynamicModule {
    return {
      module: MailgunModule,
      imports: options.imports ?? [],
      providers: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: MailgunAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(options: MailgunAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MAILGUN_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: MAILGUN_OPTIONS,
      useFactory: async (optionsFactory: MailgunOptionsFactory) => await optionsFactory.createMailgunOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
