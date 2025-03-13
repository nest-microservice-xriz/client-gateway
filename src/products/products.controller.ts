import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/conf';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger('Products')

  constructor(@Inject(NATS_SERVICE) private readonly Client: ClientProxy) {
    this.logger.log('Connected correctly')
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.Client.send({ cmd: 'create_product' }, createProductDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Get()
  getAllProduct(@Query() paginationDto: PaginationDto) {
    return this.Client.send({ cmd: 'find_all_products' }, paginationDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.Client.send({ cmd: 'find_one_product' }, { id: Number(id) }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.Client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Patch(':id')
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.Client.send({ cmd: 'update_product' }, updateProductDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

}
