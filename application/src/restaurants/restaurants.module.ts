import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { OrmModule } from '../orm/orm.module';
import { RestaurantsRepository } from './restaurants.repository';

@Module({
  imports: [OrmModule],
  providers: [RestaurantsResolver, RestaurantsService, RestaurantsRepository],
})
export class RestaurantsModule {}
