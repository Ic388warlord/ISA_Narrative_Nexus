import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard, RoleGuard } from "./auth/auth.guard";
import { RedisModule } from "./redis/redis.module";
import { MailModule } from "./mail/mail.module";
import { StoryModule } from "./story/story.module";
import { UtilModule } from "./util/util.module";
import { EndpointModule } from "./endpoint/endpoint.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UserModule,
    MailModule,
    StoryModule,
    UtilModule,
    EndpointModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
