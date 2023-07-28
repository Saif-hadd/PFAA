import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Logger } from "winston";
import { DbService } from "src/dbService/db.service";
import { MessageServiceBase } from "./base/message.service.base";

@Injectable()
export class MessageService extends MessageServiceBase {
  constructor(
    protected readonly prisma: DbService,
    protected readonly logger: Logger
  ) {
    super(prisma, logger);
  }
}
