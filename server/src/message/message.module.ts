import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { MessageModuleBase } from "./base/message.module.base";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { MessageResolver } from "./message.resolver";

@Module({
  imports: [MessageModuleBase],
  controllers: [MessageController],
  providers: [MessageService, MessageResolver, DbService],
  exports: [MessageService],
})
export class MessageModule {}
