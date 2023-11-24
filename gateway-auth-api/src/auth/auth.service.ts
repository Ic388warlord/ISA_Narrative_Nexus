import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compareSync } from "bcrypt";
import { MailService } from "src/mail/mail.service";
import { RedisService } from "src/redis/redis.service";
import { UserService } from "src/user/user.service";
import { StringService } from "src/util/util.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly stringService: StringService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findUsername(username);
    if (!user)
      throw new UnauthorizedException(
        this.stringService.auth.USER_DOES_NOT_EXIST,
      );

    const isValid = compareSync(password, user.hash);
    if (!isValid)
      throw new UnauthorizedException(
        this.stringService.auth.INVALID_CREDENTIALS,
      );

    const token = this.jwtService.signAsync(user, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_TOKEN_EXPIRATION"),
    });

    return token;
  }

  async logout(token: string) {
    if (!token)
      throw new UnauthorizedException(this.stringService.auth.INVALID_TOKEN);
    this.redisService.blacklistToken(token);
  }

  async forgotPassword(email: string) {
    const userEmail = await this.userService.findEmail(email);
    if (!userEmail)
      throw new NotFoundException(this.stringService.auth.EMAIL_DOES_NOT_EXIST);

    console.log(userEmail);

    const token = this.jwtService.sign(userEmail, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: "20m",
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
      throw new UnauthorizedException(this.stringService.auth.INVALID_TOKEN);
    }
  }

  async resetPassword(token, password, confirmPassword) {
    if (password !== confirmPassword)
      return { error: this.stringService.auth.UNMATCH_PASSWORD };

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get("JWT_SECRET"),
      });
      const userEmail = await this.userService.findEmail(payload.email);
      if (!userEmail) {
        return { error: this.stringService.auth.EMAIL_DOES_NOT_EXIST };
      }
      await this.userService.changePassword(userEmail.email, password);
      return { ok: this.stringService.auth.PASSWORD_RESET };
    } catch (err) {
      return { error: this.stringService.auth.INVALID_TOKEN };
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
