import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StringService {
  constructor(private readonly configService: ConfigService) {}
  readonly urls = {
    local: "http://localhost:3000/api",
    hosted: "https://jdefazmxvy.us18.qoddiapp.com/api",
  };
  readonly auth = {
    LOGIN_OK: "Login successful",
    LOGOUT_OK: "Successful sign out",
    INVALID_TOKEN: "Invalid token",
    INVALID_TOKEN_BL: "Invalid token: blacklisted",
    USER_DOES_NOT_EXIST: "User does not exist",
    EMAIL_DOES_NOT_EXIST: "Email does not exist",
    INVALID_CREDENTIALS: "Invalid credentials",
    UNMATCH_PASSWORD: "Passwords don't match",
    PASSWORD_RESET: "Password was reset, you can close this page.",
  } as const;
  readonly mail = {
    FROM_EMAIL: "narrativenexus@noreply.com",
    SUBJECT: "Password reset",
    TEXT: (token: string) => {
      const mode = this.configService.get("NODE_ENV");
      let url;
      if (mode === "prod") {
        url = "https://jdefazmxvy.us18.qoddiapp.com/api";
      } else {
        url = "http://localhost:3000/api";
      }
      return `Click this link to reset your password: ${url}/v1/auth/reset?token=${token}`;
    },
    HTML: (token: string) => {
      const mode = this.configService.get("NODE_ENV");
      let url;
      if (mode === "prod") {
        url = this.urls.hosted;
      } else {
        url = this.urls.local;
      }
      return `<p>Click this link to reset your password: <a href='${url}/v1/auth/reset?token=${token}'>Link</a></p>`;
    },
  };
  readonly redis = {
    REDIS_CONNECTED: "Connected to Redis Client",
    BLACK_TOKEN_TTL: (ttl: number) => `Blacklist Token TTL in seconds: ${ttl}`,
  };
  readonly story = {
    LOG_DATA: "Data value: ",
    LOG_STORY: "Created story:",
    USER_NOT_FOUND: "User does not exist",
    URL: "https://isa.stevenchow.ca/api/v1/generateStory",
  };
  readonly user = {
    LOG_EMAIL: (email: string) => `Searching for user with email: ${email}`,
    INTERNAL_USER_ERR: "Internal server error fetching users.",
    USER_EXIST: "User already exists",
  };
}
