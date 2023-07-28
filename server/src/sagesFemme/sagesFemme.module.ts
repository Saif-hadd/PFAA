import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { SagesFemmeModuleBase } from "./base/sagesFemme.module.base";
import { SagesFemmeService } from "./sagesFemme.service";
import { SagesFemmeController } from "./sagesFemme.controller";
import { SagesFemmeResolver } from "./sagesFemme.resolver";

@Module({
  imports: [SagesFemmeModuleBase],
  controllers: [SagesFemmeController],
  providers: [SagesFemmeService, SagesFemmeResolver, DbService],
  exports: [SagesFemmeService],
})
export class SagesFemmeModule {}
