import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compareSync } from "bcrypt";
import { RedisService } from "src/redis/redis.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findUser(email);
    if (!user) throw new UnauthorizedException("User does not exist");

    const isValid = compareSync(password, user.hash);
    if (!isValid) throw new UnauthorizedException("Invalid credentials");

    const token = this.jwtService.signAsync(user, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_TOKEN_EXPIRATION"),
    });

    return token;
  }

  async logout(authorization: string) {
    const [type, token] = authorization.split(" ") ?? [];
    if (type !== "Bearer") throw new UnauthorizedException("Invalid token");
    this.redisService.blacklistToken(token);
  }

  me(user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
