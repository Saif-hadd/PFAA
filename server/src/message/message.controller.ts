import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { Logger } from "winston";
import { MessageService } from "./message.service";
import { MessageControllerBase } from "./base/message.controller.base";

@swagger.ApiTags("messages")
@common.Controller("messages")
export class MessageController extends MessageControllerBase {
  constructor(
    protected readonly service: MessageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @common.Inject("winston")
    protected readonly logger: Logger
  ) {
    super(service, rolesBuilder, logger);
  }
}
