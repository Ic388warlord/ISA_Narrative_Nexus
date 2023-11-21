import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { genSaltSync, hashSync } from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dtos/register.dto";
import { StringService } from "src/util/util.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly stringService: StringService,
  ) {}

  async findEmail(email: string) {
    console.log(this.stringService.user.LOG_EMAIL(email));
    const userEmail = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    return userEmail;
  }

  async findUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
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
      console.log("Received registerDto:", registerDto);
      const newUser = await this.prismaService.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          firstname: registerDto.firstname,
          hash: hash,
        },
      });
      console.log("Created user:", newUser);
      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstname: newUser.firstname,
      };
    } catch (err) {
      throw new BadRequestException(this.stringService.user.USER_EXIST);
    }
  }

  async getAllUsers() {
    try {
      const userlist = await this.prismaService.user.findMany();
      return {
        data: userlist,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        this.stringService.user.INTERNAL_USER_ERR,
      );
    }
  }
}
