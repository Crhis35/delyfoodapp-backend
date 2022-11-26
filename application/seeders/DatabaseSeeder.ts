import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from '../factories/user.factory';
import { RestaurantFactory } from '../factories/restaurant.factory';
import { DishFactory } from '../factories/dish.factory';

const quantity = 5;

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new UserFactory(em)
      .each((user) => {
        user.restaurants.set(
          new RestaurantFactory(em)
            .each((restaurant) => {
              restaurant.owner = user;
              restaurant.menu.set(
                new DishFactory(em)
                  .each((dish) => {
                    dish.restaurant = restaurant;
                  })
                  .make(quantity),
              );
            })
            .make(1),
        );
      })
      .make(quantity);
  }
}
