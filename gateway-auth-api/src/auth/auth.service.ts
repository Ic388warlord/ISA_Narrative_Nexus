import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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

  async login(username: string, password: string) {
    const user = await this.userService.findUsername(username);
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
    const userEmail = await this.userService.findEmail(email);
    if (!userEmail) throw new NotFoundException("Email does not exist");

    const token = this.jwtService.sign(userEmail, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_TOKEN_EXPIRATION"),
    });

    return this.mailService.sendResetEmail(userEmail.email, token);
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
      const userEmail = await this.userService.findEmail(payload.email);
      if (!userEmail) {
        return { error: "Email does not exist" };
      }
      await this.userService.changePassword(userEmail.email, password);
      return { ok: "Password was reset, you can close this page." };
    } catch (err) {
      return { error: "Invalid token" };
    }
  }

  me(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
