import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { AppConfigService } from "./appConfig.service";
import { AppConfigControllerBase } from "./base/appConfig.controller.base";

@swagger.ApiTags("app-configs")
@common.Controller("app-configs")
export class AppConfigController extends AppConfigControllerBase {
  constructor(
    protected readonly service: AppConfigService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @common.Inject("winston")
    protected readonly logger: Logger
  ) {
    super(service, rolesBuilder, logger);
  }
}
