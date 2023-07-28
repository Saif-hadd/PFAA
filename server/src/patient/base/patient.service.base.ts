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
  Patient,
  PatientSageFemmeMapping,
  User,
  Room,
  SagesFemme,
} from "@prisma/client";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { Logger } from "winston";
import { DbService } from "src/dbService/db.service";

export class PatientServiceBase {
  constructor(
    protected readonly prisma: DbService,
    @Inject("winston")
    protected readonly logger: Logger
  ) {}

  async count<T extends Prisma.PatientFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientFindManyArgs>
  ): Promise<number> {
    return await this.prisma.patient.count(args);
  }

  async findMany<T extends Prisma.PatientFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientFindManyArgs>
  ): Promise<PaginatedInterface<Patient>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.patient.findMany(args),
      this.prisma.patient.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.PatientFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientFindUniqueArgs>
  ): Promise<Patient | null> {
    return await this.prisma.patient.findUnique(args);
  }
  async create<T extends Prisma.PatientCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientCreateArgs>
  ): Promise<Patient> {
    return await this.prisma.patient.create<T>(args);
  }
  async createMany<T extends Prisma.PatientCreateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientCreateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.patient.createMany<T>(args);
  }
  async update<T extends Prisma.PatientUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientUpdateArgs>
  ): Promise<Patient> {
    return await this.prisma.patient.update<T>(args);
  }
  async delete<T extends Prisma.PatientDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientDeleteArgs>
  ): Promise<Patient> {
    return await this.prisma.patient.delete(args);
  }

  async updateMany<T extends Prisma.PatientUpdateManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PatientUpdateManyArgs>
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.patient.updateMany(args);
  }

  async findPatientSageFemmeMapping(
    parentId: string,
    args: Prisma.PatientSageFemmeMappingFindManyArgs
  ): Promise<PatientSageFemmeMapping[] | null> {
    return this.prisma.patient
      .findUnique({
        where: { id: parentId },
      })
      .patientSageFemmeMapping(args);
  }

  async findUser(
    parentId: string,
    args: Prisma.UserFindManyArgs
  ): Promise<User[] | null> {
    return this.prisma.patient
      .findUnique({
        where: { id: parentId },
      })
      .user(args);
  }

  async getRoom(parentId: string): Promise<Room | null> {
    return this.prisma.patient
      .findUnique({
        where: { id: parentId },
      })
      .room();
  }

  async getSagesFemmes(parentId: string): Promise<SagesFemme | null> {
    return this.prisma.patient
      .findUnique({
        where: { id: parentId },
      })
      .sagesFemmes();
  }
}