import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContextService } from '@modules/context/base/context.service';


@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly ctx: ContextService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const req = httpCtx.getRequest<Request>();

    // Initialize context per request with request metadata
    return this.ctx.run(() => {
      this.ctx.set('requestId', req.headers['x-request-id'] || Date.now().toString());
      this.ctx.set('request', req);
      return next.handle();
    });
  }
}