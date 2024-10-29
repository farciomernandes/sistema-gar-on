import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException ? exception.getResponse() : 'An unexpected error occurred.';
    const stack = exception instanceof Error ? exception.stack : 'No stack trace available';

    console.log('-----------------------------------------');
    console.log('Unhandled Exception Details:');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Request URL: ${request.url}`);
    console.log(`Status Code: ${status}`);
    console.log(`Error Message: ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    console.log(`Stack Trace: ${stack}`);
    console.log('-----------------------------------------');

    this.logger.error(`Exception occurred: ${JSON.stringify(exception)}`, stack);

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: typeof message === 'string' ? message : 'An unexpected error occurred.',
    });
  }
}
