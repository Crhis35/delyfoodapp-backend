import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { OrmModule } from './orm/orm.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PaymentsModule } from './payments/payments.module';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      useGlobalPrefix: true,
      cache: 'bounded',
      csrfPrevention: true,
    }),
    OrmModule,
    UsersModule,
    RestaurantsModule,
    CommonModule,
    OrdersModule,
    PaymentsModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
