import { Body, Controller, Get, Inject, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/conf';
import { ChangeStatusDto, CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {

  private readonly logger = new Logger('Order')
  
  constructor(@Inject(NATS_SERVICE) private readonly Client: ClientProxy) {
    this.logger.log('Connected correctly')
  }


  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
     return this.Client.send({ cmd: 'create_order' }, createOrderDto).pipe(
          catchError(err => { throw new RpcException(err) })
    )
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.Client.send({ cmd: 'find_all_orders' }, paginationDto).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.Client.send({ cmd: 'find_one_order' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }
  
  @Patch(':id')
  changeOrderStatus(
    @Body() changeStatusDto: ChangeStatusDto,
  ) {
    return this.Client.send({ cmd: 'update_order_status' }, {changeStatusDto}).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }
  


}
