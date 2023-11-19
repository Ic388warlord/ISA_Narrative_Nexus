import { Injectable } from "@nestjs/common";

@Injectable()
export class StringService {
  readonly auth = {
    LOGIN_OK: "Login successful",
    LOGOUT_OK: "Successful sign out",
    INVALID_TOKEN: "Invalid token",
    INVALID_TOKEN_BL: "Invalid token: blacklisted",
    USER_DOES_NOT_EXIST: "User does not exist",
    EMAIL_DOES_NOT_EXIST: "Email does not exist",
    INVALID_CREDENTIALS: "Invalid credentials",
    UNMATCH_PASSWORD: "Passwords don't match",
    PASSWORD_RESET: "Password was reset, you can close this page."
  } as const;
  readonly mail = {};
  readonly redis = {};
  readonly story = {};
  readonly user = {};
}
