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
    UNABLE_TO_CONNECT: "Unable to connect to Redis",
  };
  readonly story = {
    LOG_DATA: "Data value: ",
    LOG_STORY: "Created story:",
    USER_NOT_FOUND: "User does not exist",
    URL: "https://isa.stevenchow.ca/api/v1/generateStory",
    STORY_NOT_FOUND: "Story is not found for the user.",
    UPDATED_STORY_MSG: "Story has been updated.",
    DELETED_STORY_MSG: "Story has been deleted",
    PRISMA_ERROR_CODE: "P2025", // Record to delete does not exist, chatgpt lookup of error code handle
    INVALID_STORYID: "Invalid story ID given.",
    STORY_FOUND: "successful retrieval of user's story",
    AXIOS_ERROR: "Received an invalid response from ML server",
    DATABASE_ERROR: "Unable to connect to the database",
  };
  readonly user = {
    LOG_EMAIL: (email: string) => `Searching for user with email: ${email}`,
    INTERNAL_USER_ERR: "Internal server error fetching users.",
    USER_EXIST: "User already exists",
    UPSERT_ERROR:
      "Upsert operation failed to either create item or update the count of endpoint.",
    USER_DOES_NOT_EXIST: "User does not exist.",
    ALL_USER_REQUEST_COUNT_ERROR:
      "Query did not return with all user count results.",
    ROLE_UPDATED: "Updated role successfullly",
  };
  readonly endpoint = {
    QUERY_ERROR: "Failed to query for all endpoints.",
    UPSERT_ERROR:
      "Upsert operation failed to either create item or update the count of endpoint.",
    GET_USER_STORIES_PATH: "/api/story/getUserStories",
    GET_USER_STORY_PATH: "/api/story/getUserStory",
    FORGOT_PASSWORD_PATH: "/api/auth/forgotpassword",
    USER_TOTAL_REQUEST_PATH: "/api/user/usertotalrequest",
  };
}
