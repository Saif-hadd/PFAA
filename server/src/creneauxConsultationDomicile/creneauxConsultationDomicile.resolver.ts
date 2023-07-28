import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CreneauxConsultationDomicileResolverBase } from "./base/creneauxConsultationDomicile.resolver.base";
import { CreneauxConsultationDomicile } from "./base/CreneauxConsultationDomicile";
import { CreneauxConsultationDomicileService } from "./creneauxConsultationDomicile.service";

@graphql.Resolver(() => CreneauxConsultationDomicile)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class CreneauxConsultationDomicileResolver extends CreneauxConsultationDomicileResolverBase {
  constructor(
    protected readonly service: CreneauxConsultationDomicileService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @common.Inject("winston")
    protected readonly logger: Logger
  ) {
    super(service, rolesBuilder, logger);
  }
}
