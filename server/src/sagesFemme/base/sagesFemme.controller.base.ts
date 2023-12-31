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
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { BatchPayload } from "../../BatchPayload";
import { Logger } from "winston";
import { fileDto } from "../../file.dto";
import * as XLSX from "xlsx";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { SagesFemmeService } from "../sagesFemme.service";
import { SagesFemmeCreateInput } from "./SagesFemmeCreateInput";
import { SagesFemmeCreateManyInput } from "./SagesFemmeCreateManyInput";
import { SagesFemmeWhereInput } from "./SagesFemmeWhereInput";
import { SagesFemmeWhereUniqueInput } from "./SagesFemmeWhereUniqueInput";
import { SagesFemmeFindManyArgs } from "./SagesFemmeFindManyArgs";
import { SagesFemmeupdateManyArgs } from "./SagesFemmeupdateManyArgs";
import { SagesFemmeUpdateInput } from "./SagesFemmeUpdateInput";
import { SagesFemme } from "./SagesFemme";
import { CreneauxConsultationDomicileWhereInput } from "../../creneauxConsultationDomicile/base/CreneauxConsultationDomicileWhereInput";
import { CreneauxConsultationDomicile } from "../../creneauxConsultationDomicile/base/CreneauxConsultationDomicile";
import { PatientSageFemmeMappingWhereInput } from "../../patientSageFemmeMapping/base/PatientSageFemmeMappingWhereInput";
import { PatientSageFemmeMapping } from "../../patientSageFemmeMapping/base/PatientSageFemmeMapping";
import { PatientWhereInput } from "../../patient/base/PatientWhereInput";
import { Patient } from "../../patient/base/Patient";
import { getListSagesFemmeDto } from "./getListSagesFemme.dto";
@swagger.ApiBearerAuth()
export class SagesFemmeControllerBase {
  constructor(
    protected readonly service: SagesFemmeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly logger: Logger
  ) {}

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: SagesFemme })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SagesFemmeCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SagesFemme> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      this.logger.log({
        level: "error",
        message: `providing the properties: ${properties} on ${"SagesFemme"} creation is forbidden for roles: ${roles}`,
      });

      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"SagesFemme"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        room: data.room
          ? {
              connect: data.room,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        geolocalisation: true,
        diplome: true,
        description: true,

        room: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/createMany")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: SagesFemme })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async createMany(
    @common.Body() data: Array<SagesFemmeCreateManyInput>,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BatchPayload | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      this.logger.log({
        level: "error",
        message: `providing the properties: ${properties} on ${"SagesFemme"} creation is forbidden for roles: ${roles}`,
      });

      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"SagesFemme"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.createMany({
      data: data,
      skipDuplicates: false,
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: getListSagesFemmeDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SagesFemmeFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<SagesFemme>> {
    const args = plainToClass(SagesFemmeFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SagesFemme",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        geolocalisation: true,
        diplome: true,
        description: true,

        room: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    const result = results.paginatedResult.map((result: SagesFemme) =>
      permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/fileExcel")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: fileDto })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findDataForExcel(
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<fileDto> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "SagesFemme",
    });
    const results = await this.service.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        geolocalisation: true,
        diplome: true,
        description: true,

        room: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    const result = results.paginatedResult.map((result: SagesFemme) =>
      permission.filter(result)
    );
    var excelFile = XLSX.utils.json_to_sheet(result);

    var Workbook = XLSX.utils.book_new();
    await XLSX.utils.book_append_sheet(Workbook, excelFile, "test");
    const file = await XLSX.write(Workbook, {
      bookType: "xlsx",
      bookSST: true,
      type: "base64",
    });
    return { file: file };
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: SagesFemme })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SagesFemme | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "SagesFemme",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        geolocalisation: true,
        diplome: true,
        description: true,

        room: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result === null) {
      this.logger.log({
        level: "error",
        message: `No resource was found for ${JSON.stringify(params)}`,
      });
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: SagesFemme })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body()
    data: SagesFemmeUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<SagesFemme | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      this.logger.log({
        level: "error",
        message: `No resource was found for ${JSON.stringify(params)}`,
      });
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"SagesFemme"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          room: data.room
            ? {
                connect: data.room,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          geolocalisation: true,
          diplome: true,
          description: true,

          room: {
            select: {
              id: true,
            },
          },

          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        this.logger.log({
          level: "error",
          message: `No resource was found for ${JSON.stringify(params)}`,
        });
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: SagesFemme })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SagesFemmeWhereUniqueInput
  ): Promise<SagesFemme | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          geolocalisation: true,
          diplome: true,
          description: true,

          room: {
            select: {
              id: true,
            },
          },

          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        this.logger.log({
          level: "error",
          message: `No resource was found for ${JSON.stringify(params)}`,
        });
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/creneauxConsultationDomicile")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => CreneauxConsultationDomicileWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyCreneauxConsultationDomicile(
    @common.Req() request: Request,
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<CreneauxConsultationDomicile[] | null> {
    const query: CreneauxConsultationDomicileWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "CreneauxConsultationDomicile",
    });
    const results = await this.service.findCreneauxConsultationDomicile(
      params.id,
      {
        where: query,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          jour: true,
          heureDebut: true,
          heureFin: true,

          sagesFemmes: {
            select: {
              id: true,
            },
          },
        },
      }
    );
    return results && results.map((result) => permission.filter(result));
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/creneauxConsultationDomicile")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async createCreneauxConsultationDomicile(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      creneauxConsultationDomicile: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/creneauxConsultationDomicile")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async updateCreneauxConsultationDomicile(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      creneauxConsultationDomicile: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/creneauxConsultationDomicile")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async deleteCreneauxConsultationDomicile(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      creneauxConsultationDomicile: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/patientSageFemmeMapping")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => PatientSageFemmeMappingWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyPatientSageFemmeMapping(
    @common.Req() request: Request,
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PatientSageFemmeMapping[] | null> {
    const query: PatientSageFemmeMappingWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PatientSageFemmeMapping",
    });
    const results = await this.service.findPatientSageFemmeMapping(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        estSagefemmeReference: true,

        patient: {
          select: {
            id: true,
          },
        },

        sagesFemmes: {
          select: {
            id: true,
          },
        },
      },
    });
    return results && results.map((result) => permission.filter(result));
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/patientSageFemmeMapping")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async createPatientSageFemmeMapping(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patientSageFemmeMapping: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/patientSageFemmeMapping")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async updatePatientSageFemmeMapping(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patientSageFemmeMapping: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/patientSageFemmeMapping")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async deletePatientSageFemmeMapping(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patientSageFemmeMapping: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/patient")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => PatientWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyPatient(
    @common.Req() request: Request,
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Patient[] | null> {
    const query: PatientWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Patient",
    });
    const results = await this.service.findPatient(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        dateNaissance: true,
        adresse: true,
        medecinTraitant: true,

        room: {
          select: {
            id: true,
          },
        },

        sagesFemmes: {
          select: {
            id: true,
          },
        },
      },
    });
    return results && results.map((result) => permission.filter(result));
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/patient")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async createPatient(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patient: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/patient")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async updatePatient(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patient: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/patient")
  @nestAccessControl.UseRoles({
    resource: "SagesFemme",
    action: "update",
    possession: "any",
  })
  async deletePatient(
    @common.Param() params: SagesFemmeWhereUniqueInput,
    @common.Body() body: SagesFemmeWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      patient: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "SagesFemme",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"SagesFemme"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
