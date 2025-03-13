
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { object } from 'joi';
import { log } from 'node:console';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();
    const name = exception.name;

    console.log({rpcError});
    

    if (typeof rpcError == 'object' && 'status' in rpcError && 'message' in rpcError) {
      const status = rpcError.status
      return response.status(status).json(rpcError)
    }

    response.status(400).json({
      status: 400,
      message: rpcError
    })
  }
}
