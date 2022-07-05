import { Injectable, Inject } from '@nestjs/common';
import { MAILGUN_OPTIONS } from './mailgun.constants';
import { MailgunOptions } from './mailgun.interfaces';

import formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/client';

interface IMailgunNestjsService {
  instance(): Promise<Client>;
}

@Injectable()
export class MailgunService implements IMailgunNestjsService {
  private readonly mailgun: any;
  constructor(@Inject(MAILGUN_OPTIONS) private options: MailgunOptions) {
    this.mailgun = new Mailgun(formData).client(options);
  }

  async instance(): Promise<Client> {
    return this.mailgun;
  }
}
