import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PatientSageFemmeMappingResolverBase } from "./base/patientSageFemmeMapping.resolver.base";
import { PatientSageFemmeMapping } from "./base/PatientSageFemmeMapping";
import { PatientSageFemmeMappingService } from "./patientSageFemmeMapping.service";

@graphql.Resolver(() => PatientSageFemmeMapping)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PatientSageFemmeMappingResolver extends PatientSageFemmeMappingResolverBase {
  constructor(
    protected readonly service: PatientSageFemmeMappingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @common.Inject("winston")
    protected readonly logger: Logger
  ) {
    super(service, rolesBuilder, logger);
  }
}
