import { BadRequestException, Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/conf';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto, RpcCustomExceptionFilter } from 'src/common';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger('Products')

  constructor(@Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy) {
    this.logger.log('Connected correctly')
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send({ cmd: 'create_product' }, createProductDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Get()
  getAllProduct(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'find_all_products' }, paginationDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'find_one_product' }, { id: Number(id) }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Patch(':id')
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productClient.send({ cmd: 'update_product' }, updateProductDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

}
