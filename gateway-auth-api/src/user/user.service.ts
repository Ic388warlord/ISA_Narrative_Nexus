import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { genSaltSync, hashSync } from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dtos/register.dto";
import { RequestCountDto } from "./dtos/requestCount.dto";
import { StringService } from "src/util/util.service";
import { ChangeRoleDto } from "./dtos/changerole.dto";
import { Role } from "@prisma/client";

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

  async updateRequestCounter(requestCountDto: RequestCountDto) {
    try {
      await this.prismaService.userRequestCount.upsert({
        where: { username: requestCountDto.username },
        create: {
          username: requestCountDto.username,
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });
      return;
    } catch (error) {
      throw new InternalServerErrorException(
        this.stringService.user.UPSERT_ERROR,
      );
    }
  }

  async userTotalRequest(username: string) {
    try {
      const userTotalRequest =
        await this.prismaService.userRequestCount.findUnique({
          where: {
            username: username,
          },
        });

      if (!userTotalRequest) {
        throw new NotFoundException(
          this.stringService.user.USER_DOES_NOT_EXIST,
        );
      }
      return userTotalRequest;
    } catch (error) {
      throw error;
    }
  }

  async allUserTotalRequest() {
    try {
      const alluserTotalRequest =
        await this.prismaService.userRequestCount.findMany();

      if (!alluserTotalRequest) {
        throw new InternalServerErrorException(
          this.stringService.user.ALL_USER_REQUEST_COUNT_ERROR,
        );
      }
      return alluserTotalRequest;
    } catch (error) {
      throw error;
    }
  }

  async changeRole(changeRoleDto: ChangeRoleDto) {
    try {
      const updated = await this.prismaService.user.update({
        where: { username: changeRoleDto.username },
        data: { role: Role[changeRoleDto.role] },
      });
      return;
    } catch (err) {
      throw new BadRequestException(
        this.stringService.user.USER_DOES_NOT_EXIST,
      );
    }
  }

  async overUsage(username: string) {
    const user = await this.prismaService.userRequestCount.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw new BadRequestException(
        this.stringService.user.USER_DOES_NOT_EXIST,
      );
    }
    return { overUsage: user.count > 20 };
  }
}
