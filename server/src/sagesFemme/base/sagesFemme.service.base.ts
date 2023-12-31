/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import { Inject } from "@nestjs/common";

import {
  Prisma,
  SagesFemme,
  CreneauxConsultationDomicile,
  PatientSageFemmeMapping,
  Patient,
  Room,
  User,
} from "@prisma/client";

import { PaginatedInterface } from "../../util/PaginatedInterface";
import { Logger } from "winston";
import { DbService } from "src/dbService/db.service";

export class SagesFemmeServiceBase {
  constructor(
    protected readonly prisma: DbService,
    @Inject("winston")
    protected readonly logger: Logger
  ) {}

  async count<T extends Prisma.SagesFemmeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeFindManyArgs>
  ): Promise<number> {
    return await this.prisma.sagesFemme.count(args);
  }

  async findMany<T extends Prisma.SagesFemmeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeFindManyArgs>
  ): Promise<PaginatedInterface<SagesFemme>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.sagesFemme.findMany(args),
      this.prisma.sagesFemme.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.SagesFemmeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeFindUniqueArgs>
  ): Promise<SagesFemme | null> {
    return await this.prisma.sagesFemme.findUnique(args);
  }
  async create<T extends Prisma.SagesFemmeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeCreateArgs>
  ): Promise<SagesFemme> {
    return await this.prisma.sagesFemme.create<T>(args);
  }
  async createMany<T extends Prisma.SagesFemmeCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeCreateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.sagesFemme.createMany<T>(args);
  }
  async update<T extends Prisma.SagesFemmeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeUpdateArgs>
  ): Promise<SagesFemme> {
    return await this.prisma.sagesFemme.update<T>(args);
  }
  async delete<T extends Prisma.SagesFemmeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeDeleteArgs>
  ): Promise<SagesFemme> {
    return await this.prisma.sagesFemme.delete(args);
  }

  async updateMany<T extends Prisma.SagesFemmeUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SagesFemmeUpdateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.sagesFemme.updateMany(args);
  }

  async findCreneauxConsultationDomicile(
    parentId: string,
    args: Prisma.CreneauxConsultationDomicileFindManyArgs
  ): Promise<CreneauxConsultationDomicile[] | null> {
    return this.prisma.sagesFemme
      .findUnique({
        where: { id: parentId },
      })
      .creneauxConsultationDomicile(args);
  }

  async findPatientSageFemmeMapping(
    parentId: string,
    args: Prisma.PatientSageFemmeMappingFindManyArgs
  ): Promise<PatientSageFemmeMapping[] | null> {
    return this.prisma.sagesFemme
      .findUnique({
        where: { id: parentId },
      })
      .patientSageFemmeMapping(args);
  }

  async findPatient(
    parentId: string,
    args: Prisma.PatientFindManyArgs
  ): Promise<Patient[] | null> {
    return this.prisma.sagesFemme
      .findUnique({
        where: { id: parentId },
      })
      .patient(args);
  }

  async getRoom(parentId: string): Promise<Room | null> {
    return this.prisma.sagesFemme
      .findUnique({
        where: { id: parentId },
      })
      .room();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.sagesFemme
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
