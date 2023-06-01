import { Injectable, Inject } from '@nestjs/common';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import { MAILGUN_OPTIONS } from './mailgun.constants';
import { MailgunOptions } from './mailgun.interfaces';

import formData from 'form-data';
import Mailgun from 'mailgun.js';

interface IMailgunNestjsService {
  instance(): Promise<IMailgunClient>;
}

@Injectable()
export class MailgunService implements IMailgunNestjsService {
  private readonly mailgun: any;
  constructor(@Inject(MAILGUN_OPTIONS) private options: MailgunOptions) {
    this.mailgun = new Mailgun(formData).client(options);
  }

  async instance(): Promise<IMailgunClient> {
    return this.mailgun;
  }
}
