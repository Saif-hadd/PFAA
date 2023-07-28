import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { PatientSageFemmeMappingModuleBase } from "./base/patientSageFemmeMapping.module.base";
import { PatientSageFemmeMappingService } from "./patientSageFemmeMapping.service";
import { PatientSageFemmeMappingController } from "./patientSageFemmeMapping.controller";
import { PatientSageFemmeMappingResolver } from "./patientSageFemmeMapping.resolver";

@Module({
  imports: [PatientSageFemmeMappingModuleBase],
  controllers: [PatientSageFemmeMappingController],
  providers: [
    PatientSageFemmeMappingService,
    PatientSageFemmeMappingResolver,
    DbService,
  ],
  exports: [PatientSageFemmeMappingService],
})
export class PatientSageFemmeMappingModule {}
