import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CreneauxConsultationDomicileModuleBase } from "./base/creneauxConsultationDomicile.module.base";
import { CreneauxConsultationDomicileService } from "./creneauxConsultationDomicile.service";
import { CreneauxConsultationDomicileController } from "./creneauxConsultationDomicile.controller";
import { CreneauxConsultationDomicileResolver } from "./creneauxConsultationDomicile.resolver";

@Module({
  imports: [CreneauxConsultationDomicileModuleBase],
  controllers: [CreneauxConsultationDomicileController],
  providers: [
    CreneauxConsultationDomicileService,
    CreneauxConsultationDomicileResolver,
    DbService,
  ],
  exports: [CreneauxConsultationDomicileService],
})
export class CreneauxConsultationDomicileModule {}
