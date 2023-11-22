import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { RedisModule } from "src/redis/redis.module";
import { MailModule } from "src/mail/mail.module";
import { EndpointModule } from "src/endpoint/endpoint.module";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    UserModule,
    RedisModule,
    MailModule,
    EndpointModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
