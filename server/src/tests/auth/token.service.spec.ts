/* eslint-disable import/no-unresolved */
import { JwtService } from "@nestjs/jwt";
import { mock } from "jest-mock-extended";
//@ts-ignore
import { TokenServiceBase } from "../../auth/base/token.service.base";
import {
  INVALID_FIRSTNAME_ERROR,
  INVALID_ID_ERROR,
  INVALID_LASTNAME_ERROR,
  INVALID_PASSWORD_ERROR,
  INVALID_ROLE_ERROR,
  INVALID_USERNAME_ERROR,
} from "../../auth/constants";
//@ts-ignore
import { SIGN_TOKEN, VALID_CREDENTIALS } from "./constants";

describe("Testing the TokenServiceBase", () => {
  let tokenServiceBase: TokenServiceBase;
  const jwtService = mock<JwtService>();
  beforeEach(() => {
    tokenServiceBase = new TokenServiceBase(jwtService);
    jwtService.signAsync.mockClear();
  });
  describe("Testing the BasicTokenService.createToken()", () => {
    it("should create valid token for valid username and password", async () => {
      jwtService.signAsync.mockReturnValue(Promise.resolve(SIGN_TOKEN));
      expect(
        await tokenServiceBase.createToken(
          VALID_CREDENTIALS.id,
          VALID_CREDENTIALS.username,
          VALID_CREDENTIALS.password,
          VALID_CREDENTIALS.role,
          VALID_CREDENTIALS.firstName,
          VALID_CREDENTIALS.lastName,
          true
        )
      ).toBe(SIGN_TOKEN);
    });
    it("should reject when id missing", () => {
      const result = tokenServiceBase.createToken(
        //@ts-ignore
        null,
        VALID_CREDENTIALS.username,
        VALID_CREDENTIALS.password,
        VALID_CREDENTIALS.role,
        VALID_CREDENTIALS.firstName,
        VALID_CREDENTIALS.lastName
      );
      return expect(result).rejects.toBe(INVALID_ID_ERROR);
    });
    it("should reject when username missing", () => {
      const result = tokenServiceBase.createToken(
        VALID_CREDENTIALS.id,
        //@ts-ignore
        null,
        VALID_CREDENTIALS.password,
        VALID_CREDENTIALS.role,
        VALID_CREDENTIALS.firstName,
        VALID_CREDENTIALS.lastName
      );
      return expect(result).rejects.toBe(INVALID_USERNAME_ERROR);
    });
    it("should reject when password missing", () => {
      const result = tokenServiceBase.createToken(
        VALID_CREDENTIALS.id,
        VALID_CREDENTIALS.username,
        //@ts-ignore
        null,
        VALID_CREDENTIALS.role,
        VALID_CREDENTIALS.firstName,
        VALID_CREDENTIALS.lastName
      );
      return expect(result).rejects.toBe(INVALID_PASSWORD_ERROR);
    });
    it("should reject when role missing", () => {
      const result = tokenServiceBase.createToken(
        VALID_CREDENTIALS.id,
        VALID_CREDENTIALS.username,
        VALID_CREDENTIALS.password,
        //@ts-ignore
        null,
        VALID_CREDENTIALS.firstName,
        VALID_CREDENTIALS.lastName
      );
      return expect(result).rejects.toBe(INVALID_ROLE_ERROR);
    });
    it("should reject when firstName missing", () => {
      const result = tokenServiceBase.createToken(
        VALID_CREDENTIALS.id,
        VALID_CREDENTIALS.username,
        VALID_CREDENTIALS.password,
        VALID_CREDENTIALS.role,
        //@ts-ignore
        null,

        VALID_CREDENTIALS.lastName
      );
      return expect(result).rejects.toBe(INVALID_FIRSTNAME_ERROR);
    });
    it("should reject when lastName missing", () => {
      const result = tokenServiceBase.createToken(
        VALID_CREDENTIALS.id,
        VALID_CREDENTIALS.username,
        VALID_CREDENTIALS.password,
        VALID_CREDENTIALS.role,
        VALID_CREDENTIALS.firstName,
        //@ts-ignore
        null
      );
      return expect(result).rejects.toBe(INVALID_LASTNAME_ERROR);
    });
  });
});
