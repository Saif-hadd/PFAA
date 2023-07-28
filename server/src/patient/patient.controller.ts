import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { PatientService } from "./patient.service";
import { PatientControllerBase } from "./base/patient.controller.base";

@swagger.ApiTags("patients")
@common.Controller("patients")
export class PatientController extends PatientControllerBase {
  constructor(
    protected readonly service: PatientService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @common.Inject("winston")
    protected readonly logger: Logger
  ) {
    super(service, rolesBuilder, logger);
  }
}
