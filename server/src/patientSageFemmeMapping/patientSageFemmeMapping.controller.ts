import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { PatientSageFemmeMappingService } from "./patientSageFemmeMapping.service";
import { PatientSageFemmeMappingControllerBase } from "./base/patientSageFemmeMapping.controller.base";

@swagger.ApiTags("patient-sage-femme-mappings")
@common.Controller("patient-sage-femme-mappings")
export class PatientSageFemmeMappingController extends PatientSageFemmeMappingControllerBase {
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
