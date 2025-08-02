import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextService } from '@modules/context/base/context.service';


export const ReqContext = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const requestContext = ctx.switchToHttp().getRequest<Request & { contextService?: ContextService }>();
    // Assuming RequestContextService is globally available
    const store = (new ContextService()).getStore();
    if (!store) return null;
    return data ? store.get(data) : Array.from(store.entries()).reduce((obj, [k, v]) => ({
      ...obj,
      [k]: v,
    }), {} as any);
  },
);