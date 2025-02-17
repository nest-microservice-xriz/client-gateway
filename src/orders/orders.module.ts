import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/conf';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports:[
     ClientsModule.register([
          {
            name: ORDER_SERVICE,
            transport: Transport.TCP,
            options: {
              host: envs.ORDERS_MICROSERVICE_HOST,
              port: envs.ORDERS_MICROSERVICE_PORT,
            },
          },
        ]),
  ]
})
export class OrdersModule {}
