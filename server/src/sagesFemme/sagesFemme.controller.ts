import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { SagesFemmeService } from "./sagesFemme.service";
import { SagesFemmeControllerBase } from "./base/sagesFemme.controller.base";

@swagger.ApiTags("sages-femmes")
@common.Controller("sages-femmes")
export class SagesFemmeController extends SagesFemmeControllerBase {
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
