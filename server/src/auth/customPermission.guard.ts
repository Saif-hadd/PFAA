import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";
import { RequestContext } from "nestjs-request-context";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride("roles", [
            context.getHandler(),
            context.getClass(),
        ]);
        const entity: string = requiredRoles[0].resource // entity name
        const possession: string = requiredRoles[0].possession // own || any 

        // CustomPermission decorator data
        const permission = this.reflector.getAllAndOverride("customPermission", [
            context.getHandler(),
            context.getClass(),
        ]);
        const roles: string[] = permission?.roles ?? []
        const reference: string = permission?.reference ?? 'id' // INFO: if using decorator on non user entity you need to pass reference of the userId
        const user: any = RequestContext.currentContext.req.user; // request => user (needed for user.id)
        const params = RequestContext.currentContext.req.params; // request => params (needed for params.id)

        // check for roles that are allowed 
        let allowed = roles.length > 0 ? roles.some((role: string) => user.roles?.includes(role)) : true

        if (allowed) {
            // if possession is any return true else we need to check if the action is performed on a own record (using reference) 
            if (possession === "own") {
                const prisma = new PrismaClient()
                const data = await (prisma as any)[entity].findUnique({
                    where: {
                        id: params?.id ?? ''
                    }
                })
                return data?.[reference] === user.id
            }
            return true
        }
        return false
    }
}