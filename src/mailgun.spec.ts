import Client from 'mailgun.js/client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { MAILGUN_TOKEN, MailgunModule } from './';

describe('Mailgun forRoot', () => {
  let mailgunService: Client;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MailgunModule.forRoot({ username: 'api', key: 'key-yourkeyhere' })],
    }).compile();

    mailgunService = moduleRef.get<Client>(MAILGUN_TOKEN);
  });

  describe('mailgunService', () => {
    it('method ping exists', async () => {
      expect(mailgunService.messages.create).toBeDefined();
    });

    it('method is a function', async () => {
      expect(mailgunService.messages.create).toBeInstanceOf(Function);
    });
  });
});

describe('Mailgun forRootAsync', () => {
  let mailgunService: Client;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MailgunModule.forRootAsync({
          useFactory: () => ({ username: 'api', key: 'key-yourkeyhere' }),
        }),
      ],
    }).compile();

    mailgunService = moduleRef.get<Client>(MAILGUN_TOKEN);
  });

  describe('mailgunService', () => {
    it('method ping exists', async () => {
      expect(mailgunService.messages.create).toBeDefined();
    });

    it('method is a function', async () => {
      expect(mailgunService.messages.create).toBeInstanceOf(Function);
    });
  });
});

describe('Mailgun forRootAsync imports ConfigModules', () => {
  let mailgunService: Client;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MailgunModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => ({
            username: config.get('API_NAME') || 'api',
            key: config.get('API_KEY') || 'API_KEY',
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    mailgunService = moduleRef.get<Client>(MAILGUN_TOKEN);
  });

  describe('mailgunService', () => {
    it('method ping exists', async () => {
      expect(mailgunService.messages.create).toBeDefined();
    });

    it('method is a function', async () => {
      expect(mailgunService.messages.create).toBeInstanceOf(Function);
    });
  });
});
