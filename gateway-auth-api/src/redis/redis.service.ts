import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { createClient } from "redis";
import { StringService } from "src/util/util.service";

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  client: ReturnType<typeof createClient>;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly stringService: StringService,
  ) {
    const redisClient = createClient({
      password: configService.get("REDIS_PASSWORD"),
      socket: {
        host: configService.get("REDIS_HOST"),
        port: 13298,
      },
    });
    this.client = redisClient;
    this.client
      .connect()
      .then(() => this.logger.log(this.stringService.redis.REDIS_CONNECTED))
      .catch(() => {
        throw new ServiceUnavailableException(
          stringService.redis.UNABLE_TO_CONNECT,
        );
      });
  }

  async blacklistToken(token: string): Promise<void> {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get("JWT_SECRET"),
    });
    const iat = payload.iat;
    const exp = payload.exp;
    this.logger.log(`${iat} | ${exp}`);

    const ttl = exp - Math.ceil(Date.now() / 1000);
    this.logger.log(this.stringService.redis.BLACK_TOKEN_TTL(ttl));

    await this.client.set(token, ttl);
    await this.client.expire(token, ttl);
  }

  async isBlacklistedToken(token: string): Promise<boolean> {
    const found = await this.client.get(token);
    return found != null;
  }
}
