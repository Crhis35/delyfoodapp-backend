import { Factory, Faker } from '@mikro-orm/seeder';
import { Restaurant } from '../src/entities';

export class RestaurantFactory extends Factory<Restaurant> {
  model = Restaurant;

  definition(faker: Faker): Partial<Restaurant> {
    return {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
      coverImg: faker.image.business(),
    };
  }
}
