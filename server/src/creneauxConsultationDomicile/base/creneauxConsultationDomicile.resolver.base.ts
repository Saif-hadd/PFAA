/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { CreateCreneauxConsultationDomicileArgs } from "./CreateCreneauxConsultationDomicileArgs";
import { UpdateCreneauxConsultationDomicileArgs } from "./UpdateCreneauxConsultationDomicileArgs";
import { DeleteCreneauxConsultationDomicileArgs } from "./DeleteCreneauxConsultationDomicileArgs";
import { CreneauxConsultationDomicileFindManyArgs } from "./CreneauxConsultationDomicileFindManyArgs";
import { CreneauxConsultationDomicileFindUniqueArgs } from "./CreneauxConsultationDomicileFindUniqueArgs";
import { CreneauxConsultationDomicile } from "./CreneauxConsultationDomicile";
import { SagesFemme } from "../../sagesFemme/base/SagesFemme";
import { CreneauxConsultationDomicileService } from "../creneauxConsultationDomicile.service";

@graphql.Resolver(() => CreneauxConsultationDomicile)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class CreneauxConsultationDomicileResolverBase {
  constructor(
    protected readonly service: CreneauxConsultationDomicileService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly logger: Logger
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "read",
    possession: "any",
  })
  async _creneauxConsultationDomicilesMeta(
    @graphql.Args() args: CreneauxConsultationDomicileFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [CreneauxConsultationDomicile])
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "read",
    possession: "any",
  })
  async creneauxConsultationDomiciles(
    @graphql.Args() args: CreneauxConsultationDomicileFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<CreneauxConsultationDomicile>> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "CreneauxConsultationDomicile",
    });
    const results = await this.service.findMany(args);
    const result = results.paginatedResult.map(
      (result: CreneauxConsultationDomicile) => permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @graphql.Query(() => CreneauxConsultationDomicile, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "read",
    possession: "own",
  })
  async creneauxConsultationDomicile(
    @graphql.Args() args: CreneauxConsultationDomicileFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CreneauxConsultationDomicile | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "CreneauxConsultationDomicile",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => CreneauxConsultationDomicile)
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "create",
    possession: "any",
  })
  async createCreneauxConsultationDomicile(
    @graphql.Args() args: CreateCreneauxConsultationDomicileArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CreneauxConsultationDomicile> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "CreneauxConsultationDomicile",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"CreneauxConsultationDomicile"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        sagesFemmes: args.data.sagesFemmes
          ? {
              connect: args.data.sagesFemmes,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => CreneauxConsultationDomicile)
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "update",
    possession: "any",
  })
  async updateCreneauxConsultationDomicile(
    @graphql.Args() args: UpdateCreneauxConsultationDomicileArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CreneauxConsultationDomicile | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "CreneauxConsultationDomicile",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"CreneauxConsultationDomicile"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          sagesFemmes: args.data.sagesFemmes
            ? {
                connect: args.data.sagesFemmes,
              }
            : undefined,
        },
      });
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => CreneauxConsultationDomicile)
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "delete",
    possession: "any",
  })
  async deleteCreneauxConsultationDomicile(
    @graphql.Args() args: DeleteCreneauxConsultationDomicileArgs
  ): Promise<CreneauxConsultationDomicile | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => SagesFemme, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CreneauxConsultationDomicile",
    action: "read",
    possession: "any",
  })
  async sagesFemmes(
    @graphql.Parent() parent: CreneauxConsultationDomicile,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<SagesFemme | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SagesFemme",
    });
    const result = await this.service.getSagesFemmes(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
