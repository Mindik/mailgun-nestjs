import { Inject } from '@nestjs/common';
import { MAILGUN_TOKEN } from './mailgun.constants';

export const InjectMailgun = () => Inject(MAILGUN_TOKEN);
