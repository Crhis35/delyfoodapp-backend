import { Resolver } from '@nestjs/graphql';
import { EmailsService } from './emails.service';

@Resolver()
export class EmailsResolver {
  constructor(private readonly emailsService: EmailsService) {}
}
