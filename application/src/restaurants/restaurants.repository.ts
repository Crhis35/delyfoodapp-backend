import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../common/abstract.repository';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsRepository extends AbstractRepository<Restaurant> {
  protected readonly logger = new Logger(RestaurantsRepository.name);

  constructor(
    @InjectRepository(Restaurant.name)
    readonly userRepository: EntityRepository<Restaurant>,
  ) {
    super(userRepository);
  }
}
