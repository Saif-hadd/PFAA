import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestContext } from "nestjs-request-context";

/**
* Access the user data from the request object i.e `req.user`.
*/
export function getUser(executionContext: ExecutionContext) {
return RequestContext.currentContext.req.user;
}

export const UserData = createParamDecorator((data, ctx: ExecutionContext) =>
 getUser(ctx)
);