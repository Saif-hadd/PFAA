import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SagesFemmeResolverBase } from "./base/sagesFemme.resolver.base";
import { SagesFemme } from "./base/SagesFemme";
import { SagesFemmeService } from "./sagesFemme.service";

@graphql.Resolver(() => SagesFemme)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SagesFemmeResolver extends SagesFemmeResolverBase {
  constructor(
    protected readonly service: SagesFemmeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @common.Inject("winston")
    protected readonly logger: Logger
  ) {
    super(service, rolesBuilder, logger);
  }
}
