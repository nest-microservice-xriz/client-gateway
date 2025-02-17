import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/conf';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PRODUCTS_MICROSERVICE_HOST,
          port: envs.PRODUCTS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
