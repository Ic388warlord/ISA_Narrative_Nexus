import { Injectable } from "@nestjs/common";

@Injectable()
export class StringService {
  readonly auth = {
    LOGIN_OK: "Login successful",
  };
  readonly mail = {};
  readonly redis = {};
  readonly story = {};
  readonly user = {};
}
