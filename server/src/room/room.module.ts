import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { RoomModuleBase } from "./base/room.module.base";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { RoomResolver } from "./room.resolver";

@Module({
  imports: [RoomModuleBase],
  controllers: [RoomController],
  providers: [RoomService, RoomResolver, DbService],
  exports: [RoomService],
})
export class RoomModule {}
