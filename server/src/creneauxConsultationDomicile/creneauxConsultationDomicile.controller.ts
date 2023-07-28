import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { CreneauxConsultationDomicileService } from "./creneauxConsultationDomicile.service";
import { CreneauxConsultationDomicileControllerBase } from "./base/creneauxConsultationDomicile.controller.base";

@swagger.ApiTags("creneaux-consultation-domiciles")
@common.Controller("creneaux-consultation-domiciles")
export class CreneauxConsultationDomicileController extends CreneauxConsultationDomicileControllerBase {
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
