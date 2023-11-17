import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compareSync } from "bcrypt";
import { MailService } from "src/mail/mail.service";
import { RedisService } from "src/redis/redis.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
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

  async logout(token: string) {
    if (!token) throw new UnauthorizedException("Invalid token");
    this.redisService.blacklistToken(token);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findUser(email);
    if (!user) throw new UnauthorizedException("User does not exist");

    const token = this.jwtService.sign(user, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_TOKEN_EXPIRATION"),
    });

    return this.mailService.sendResetEmail(user.email, token);
  }

  async verifyResetToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get("JWT_SECRET"),
      });
      return { user: payload };
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  async resetPassword(token, password, confirmPassword) {
    if (password !== confirmPassword) return { error: "Passwords don't match" };

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get("JWT_SECRET"),
      });
      const user = await this.userService.findUser(payload.email);
      if (!user) {
        return { error: "User does not exist" };
      }
      await this.userService.changePassword(user.email, password);
      return { ok: "Password was reset, you can close this page." };
    } catch (err) {
      return { error: "Invalid token" };
    }
  }

  me(user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
