import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { createClient } from "redis";

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  client: ReturnType<typeof createClient>;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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
      .then(() => this.logger.log("Connected to Redis Client"));
  }

  async blacklistToken(token: string): Promise<void> {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get("JWT_SECRET"),
    });
    const iat = payload.iat;
    const exp = payload.exp;
    this.logger.log(`${iat} | ${exp}`);

    const ttl = exp - Math.ceil(Date.now() / 1000);
    this.logger.log(`Blacklist Token TTL in seconds: ${ttl}`);

    await this.client.set(token, ttl);
    await this.client.expire(token, ttl);
  }

  async isBlacklistedToken(token: string): Promise<boolean> {
    const found = await this.client.get(token);
    return found != null;
  }
}
