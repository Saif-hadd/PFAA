import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { CreneauxConsultationDomicileController } from "../creneauxConsultationDomicile.controller";
import { CreneauxConsultationDomicileService } from "../creneauxConsultationDomicile.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  jour: "exampleJour",
  heureDebut: new Date(),
  heureFin: new Date(),
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  jour: "exampleJour",
  heureDebut: new Date(),
  heureFin: new Date(),
};
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  jour: "exampleJour",
  heureDebut: new Date(),
  heureFin: new Date(),
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

describe("CreneauxConsultationDomicile", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CreneauxConsultationDomicileService,
          useValue: service,
        },
      ],
      controllers: [CreneauxConsultationDomicileController],
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

  test("POST /creneaux-consultation-domiciles", async () => {
    await request(app.getHttpServer())
      .post("/creneaux-consultation-domiciles")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        deletedAt: CREATE_RESULT.deletedAt.toISOString(),
        heureDebut: CREATE_RESULT.heureDebut.toISOString(),
        heureFin: CREATE_RESULT.heureFin.toISOString(),
      });
  });

  test("GET /creneaux-consultation-domiciles", async () => {
    await request(app.getHttpServer())
      .get("/creneaux-consultation-domiciles")
      .expect(HttpStatus.OK)
      .expect({
        paginatedResult: [
          {
            ...FIND_ONE_RESULT,
            createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
            updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
            deletedAt: FIND_ONE_RESULT.deletedAt.toISOString(),
            heureDebut: FIND_ONE_RESULT.heureDebut.toISOString(),
            heureFin: FIND_ONE_RESULT.heureFin.toISOString(),
          },
        ],
        totalCount: 1,
      });
  });

  test("GET /creneaux-consultation-domiciles/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/creneaux-consultation-domiciles"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /creneaux-consultation-domiciles/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/creneaux-consultation-domiciles"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        deletedAt: FIND_ONE_RESULT.deletedAt.toISOString(),
        heureDebut: FIND_ONE_RESULT.heureDebut.toISOString(),
        heureFin: FIND_ONE_RESULT.heureFin.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
