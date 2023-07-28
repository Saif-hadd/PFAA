import { Test, TestingModule } from "@nestjs/testing";
// @ts-ignore
// eslint-disable-next-line
import { User } from "src/user/base/User";
// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Credentials } from "./Credentials";
import { PasswordService } from "./password.service";
// @ts-ignore
// eslint-disable-next-line
import { TokenService } from "./token.service";
import { PrismaService } from "nestjs-prisma";
import { WinstonModule } from "nest-winston";
import winston from "winston";

const VALID_CREDENTIALS: Credentials = {
  email: "Valid User",
  password: "Valid User Password",
};
const INVALID_CREDENTIALS: Credentials = {
  email: "Invalid User",
  password: "Invalid User Password",
};
const USER: any = {
  ...VALID_CREDENTIALS,
  createdAt: new Date(),
  firstName: "ofek",
  id: "1",
  lastName: "gabay",
  username: "Valid User",
  roles: ["admin"],
  updatedAt: new Date(),
};

const SIGN_TOKEN = "SIGN_TOKEN";

const userService = {
  findOne(args: { where: { username: string } }): any | null {
    if (args.where.username === VALID_CREDENTIALS.email) {
      return USER;
    }
    return null;
  },
};

const passwordService = {
  compare(password: string, encrypted: string) {
    return true;
  },
};

const tokenService = {
  createToken(username: string, password: string) {
    return SIGN_TOKEN;
  },
};
const prismaService = {
  
}
describe("AuthService", () => {
  //ARRANGE
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
        {
          provide: TokenService,
          useValue: tokenService,
        },
        {
          provide: PrismaService,
          useValue: prismaService,
        },
        AuthService,
      ],
      imports: [WinstonModule.forRoot({transports: [new winston.transports.Console()]})],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Testing the authService.validateUser()", () => {
    it("should validate a valid user", async () => {
      await expect(
        service.validateUser(
          VALID_CREDENTIALS.email,
          VALID_CREDENTIALS.password
        )
      ).resolves.toEqual({
        username: USER.username,
        roles: USER.roles,
      });
    });

    it("should not validate a invalid user", async () => {
      await expect(
        service.validateUser(
          INVALID_CREDENTIALS.email,
          INVALID_CREDENTIALS.password
        )
      ).resolves.toBe(null);
    });
  });


});
