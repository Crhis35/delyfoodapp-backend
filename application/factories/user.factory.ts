import { Factory, Faker } from '@mikro-orm/seeder';
import { UserRole } from '../src/users/entities/user.entity';
import { User } from '../src/entities';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      name: faker.internet.userName(),
      lastName: faker.internet.userName(),
      email: faker.internet.email(),
      role: UserRole.OWNER,
    };
  }
}
