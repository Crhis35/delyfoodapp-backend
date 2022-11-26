import { Factory, Faker } from '@mikro-orm/seeder';
import { Dish } from '../src/entities';

export class DishFactory extends Factory<Dish> {
  model = Dish;

  definition(faker: Faker): Partial<Dish> {
    return {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      photo: faker.image.food(),
    };
  }
}
