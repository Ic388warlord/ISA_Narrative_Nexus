import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { genSaltSync, hashSync } from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findUser(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  async changePassword(email, password) {
    const salt = genSaltSync(parseInt(this.configService.get("SALT_ROUNDS")));
    const hash = hashSync(password, salt);
    await this.prismaService.user.update({
      where: { email },
      data: { hash },
    });
  }

  async createUser(registerDto: RegisterDto) {
    const salt = genSaltSync(parseInt(this.configService.get("SALT_ROUNDS")));
    const hash = hashSync(registerDto.password, salt);
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          hash: hash,
        },
      });
      return {
        id: newUser.id,
        email: newUser.email,
      };
    } catch (err) {
      throw new BadRequestException("User already exists");
    }
  }
}
