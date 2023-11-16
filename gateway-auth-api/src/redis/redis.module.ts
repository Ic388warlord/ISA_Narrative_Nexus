import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";

@Module({
  exports: [RedisService],
  imports: [],
  providers: [RedisService],
})
export class RedisModule {}
