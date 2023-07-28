import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Logger } from "winston";
import { DbService } from "src/dbService/db.service";
import { PatientSageFemmeMappingServiceBase } from "./base/patientSageFemmeMapping.service.base";

@Injectable()
export class PatientSageFemmeMappingService extends PatientSageFemmeMappingServiceBase {
  constructor(
    protected readonly prisma: DbService,
    protected readonly logger: Logger
  ) {
    super(prisma, logger);
  }
}
