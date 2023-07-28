import { UserInfo } from "../../auth/UserInfo";

export const TEST_USER: UserInfo = { roles: ["User"], username: "ofek" };
export const SIGN_TOKEN = "SIGN_TOKEN";
export const VALID_CREDENTIALS = {
  id:"Valid id",
  email: "Valid User",
  password: "Valid User Password",
  username: "Valid Username",
  role: "Valid role",
  firstName: "Valid firstName",
  lastName: "Valid lastName",
  rememberMe: true

};
export const INVALID_CREDENTIALS = {
  id:"Invalid id",
  email: "Invalid User",
  password: "Invalid User Password",
  username: "Invalid Username",
  role: "Invalid role",
  firstName: "Invalid firstName",
  lastName: "Invalid lastName",
  rememberMe: true
};
