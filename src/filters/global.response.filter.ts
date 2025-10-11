import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.url.includes('/auth/google/callback')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((content: object) => ({
        success: true,
        statusCode: 200,
        content,
        message: 'Successfully!',
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
