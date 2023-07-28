import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { PatientSageFemmeMappingController } from "../patientSageFemmeMapping.controller";
import { PatientSageFemmeMappingService } from "../patientSageFemmeMapping.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  estSagefemmeReference: "true",
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  estSagefemmeReference: "true",
};
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  estSagefemmeReference: "true",
};
const FIND_MANY_RESULT = { paginatedResult: [FIND_ONE_RESULT], totalCount: 1 };

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("PatientSageFemmeMapping", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PatientSageFemmeMappingService,
          useValue: service,
        },
      ],
      controllers: [PatientSageFemmeMappingController],
      imports: [
        ACLModule,
        WinstonModule.forRoot({
          transports: [new winston.transports.Console()],
        }),
      ],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /patient-sage-femme-mappings", async () => {
    await request(app.getHttpServer())
      .post("/patient-sage-femme-mappings")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        deletedAt: CREATE_RESULT.deletedAt.toISOString(),
      });
  });

  test("GET /patient-sage-femme-mappings", async () => {
    await request(app.getHttpServer())
      .get("/patient-sage-femme-mappings")
      .expect(HttpStatus.OK)
      .expect({
        paginatedResult: [
          {
            ...FIND_ONE_RESULT,
            createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
            updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
            deletedAt: FIND_ONE_RESULT.deletedAt.toISOString(),
          },
        ],
        totalCount: 1,
      });
  });

  test("GET /patient-sage-femme-mappings/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/patient-sage-femme-mappings"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /patient-sage-femme-mappings/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/patient-sage-femme-mappings"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        deletedAt: FIND_ONE_RESULT.deletedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
